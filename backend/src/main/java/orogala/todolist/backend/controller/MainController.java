package orogala.todolist.backend.controller;

import org.quartz.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import orogala.todolist.backend.job.EmailJob;
import orogala.todolist.backend.job.ReminderJob;
import orogala.todolist.backend.model.LoginResponse;
import orogala.todolist.backend.model.Priority;
import orogala.todolist.backend.model.Task;
import orogala.todolist.backend.model.TodoUser;
import orogala.todolist.backend.repository.PriorityRepository;
import orogala.todolist.backend.repository.TaskRepository;
import orogala.todolist.backend.repository.UserRepository;
import orogala.todolist.backend.service.AuthenticationService;
import orogala.todolist.backend.service.MailService;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import static org.quartz.SimpleScheduleBuilder.simpleSchedule;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class MainController {
    @Autowired
    private PriorityRepository priorityRepository;
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private MailService mailService;
    @Autowired
    private Scheduler scheduler;
    @Autowired
    private AuthenticationService authService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public LoginResponse registerUser(@RequestBody TodoUser todoUser) {
        return authService.registerUser(todoUser.getEmail(), todoUser.getPassword());

    }

    @PostMapping("/login")
    public LoginResponse loginUser(@RequestBody TodoUser todoUser) {
        return authService.loginUser(todoUser.getEmail(), todoUser.getPassword());
    }

    @GetMapping(path="/tasks")
    public ResponseEntity<List<Task>> getAllTasks() {
        JwtAuthenticationToken token = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = (Jwt) token.getCredentials();
        String email = jwt.getClaims().get("sub").toString();

        Optional<TodoUser> userData = userRepository.findByEmail(email);
        if (userData.isPresent()) {

            Optional<ArrayList<Task>> tasksData = taskRepository.findAllByUser_Id(userData.get().getId());

            if (tasksData.isPresent()) {
                List<Task> tasks = new ArrayList<Task>(tasksData.get());

                if (tasks.isEmpty()){
                    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                }

                return new ResponseEntity<>(tasks, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping(path="/tasks")
    public ResponseEntity<Task> addTask(@RequestBody Task task) {
        JwtAuthenticationToken token = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = (Jwt) token.getCredentials();
        String email = jwt.getClaims().get("sub").toString();

        Optional<TodoUser> userData = userRepository.findByEmail(email);
        if (userData.isPresent()) {
            try {
                task.setUser(userData.get());
                Task newTask = taskRepository.save(task);
                scheduleTask(newTask, email);
                return new ResponseEntity<>(newTask, HttpStatus.CREATED);
            } catch(Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PutMapping(path="/tasks/{id}")
    public ResponseEntity<Task> editTask(@RequestBody Task newTask, @PathVariable("id") Integer id) {
        JwtAuthenticationToken token = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = (Jwt) token.getCredentials();
        String email = jwt.getClaims().get("sub").toString();

        Optional<TodoUser> userData = userRepository.findByEmail(email);
        if (userData.isPresent()) {
            Optional<Task> taskData = taskRepository.findById(id);
            if (taskData.isPresent() && Objects.equals(taskData.get().getUser().getId(), userData.get().getId())) {
                    try {
                        Task task = taskData.get();
                        task.setTitle(newTask.getTitle());
                        task.setDescription(newTask.getDescription());
                        task.setStartDate(newTask.getStartDate());
                        task.setEndDate(newTask.getEndDate());
                        task.setPriority(newTask.getPriority());
                        task.setFinished(newTask.getFinished());
                        task.setAllDay(newTask.getAllDay());

                        scheduler.deleteJob(new JobKey(id.toString(), "email-jobs"));
                        scheduleTask(task, task.getUser().getEmail());

                        return new ResponseEntity<>(taskRepository.save(task), HttpStatus.OK);

                    }
                    catch(Exception e) {
                        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                    }
            }
            else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
       return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @DeleteMapping(path="/tasks/{id}")
    public ResponseEntity<HttpStatus> deleteTask(@PathVariable("id") Integer id) {
        JwtAuthenticationToken token = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = (Jwt) token.getCredentials();
        String email = jwt.getClaims().get("sub").toString();

        Optional<TodoUser> userData = userRepository.findByEmail(email);
        if (userData.isPresent()) {
            Optional<Task> taskData = taskRepository.findById(id);
            if (taskData.isPresent() && Objects.equals(taskData.get().getUser().getId(), userData.get().getId())) {
                try {
                    taskRepository.deleteById(id);
                    scheduler.deleteJob(new JobKey(id.toString(), "email-jobs"));
                    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                } catch (Exception e) {
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
            else return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping(path="/priorities")
    public ResponseEntity<List<Priority>> getAllPriorities() {
        List<Priority> priorities = new ArrayList<Priority>();
        priorityRepository.findAll().forEach(priorities::add);
        if (priorities.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(priorities, HttpStatus.OK);
    }

    @PostMapping(path="/sendmail")
    public ResponseEntity<HttpStatus> sendAttachmentMail(@RequestBody String file) {
        JwtAuthenticationToken token = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = (Jwt) token.getCredentials();
        String email = jwt.getClaims().get("sub").toString();

        mailService.sendEmailWithAttachment(
                email,
                "New task",
                file);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(path="/validate")
    public ResponseEntity<HttpStatus> validateToken () {
        JwtAuthenticationToken token = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = (Jwt) token.getCredentials();
        String email = jwt.getClaims().get("sub").toString();

        Optional<TodoUser> userData = userRepository.findByEmail(email);
        if (userData.isPresent()) return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    private JobDetail buildJobDetail(String email, String subject, String body, String id) {
        JobDataMap jobDataMap = new JobDataMap();

        jobDataMap.put("email", email);
        jobDataMap.put("subject", subject);
        jobDataMap.put("body", body);

        return JobBuilder.newJob(EmailJob.class)
                .withIdentity(id, "email-jobs")
                .withDescription("Send Email Job")
                .usingJobData(jobDataMap)
                .storeDurably()
                .build();
    }

    private Trigger buildJobTrigger(JobDetail jobDetail, ZonedDateTime startAt) {
        return TriggerBuilder.newTrigger()
                .forJob(jobDetail)
                .withIdentity(jobDetail.getKey().getName(), "email-triggers")
                .withDescription("Send Email Trigger")
                .startAt(Date.from(startAt.toInstant()))
                .withSchedule(simpleSchedule().withMisfireHandlingInstructionFireNow())
                .build();
    }

    private void scheduleTask(Task task, String email) throws SchedulerException {
        ZonedDateTime dateTime = task.getStartDate().toInstant().atZone(ZoneId.systemDefault()).minusMinutes(15);
        DateTimeFormatter formatter;

        String mailBody = "";
        String start = "";
        String end = "";
        if (task.getAllDay()) {
            mailBody = "All day task\n";
            start = DateTimeFormatter.ofPattern("dd/MM/yyyy")
                    .format(task.getStartDate().toInstant().atZone(ZoneId.systemDefault()));
            end = DateTimeFormatter.ofPattern("dd/MM/yyyy")
                    .format(task.getEndDate().toInstant().atZone(ZoneId.systemDefault()));
        }
        else {
            start = DateTimeFormatter.ofPattern("dd/MM/yyyy hh:mm")
                    .format(task.getStartDate().toInstant().atZone(ZoneId.systemDefault()));
            end = DateTimeFormatter.ofPattern("dd/MM/yyyy hh:mm")
                    .format(task.getEndDate().toInstant().atZone(ZoneId.systemDefault()));
        }

        mailBody += "Start: "
                + start
                + "\nEnd: "
                + end
                + "\n\n"
                + task.getDescription();

        JobDetail jobDetail = buildJobDetail(email,
                "Upcoming task: " + task.getTitle(),
                mailBody,
                task.getId().toString()
        );
        Trigger trigger = buildJobTrigger(jobDetail, dateTime);
        scheduler.scheduleJob(jobDetail, trigger);
    }

    @Bean
    private void scheduleReminders() throws SchedulerException {
        scheduler.deleteJob(new JobKey("reminders", "reminder-jobs"));

        JobDetail jobDetail = JobBuilder.newJob(ReminderJob.class)
                .withIdentity("reminders", "reminder-jobs")
                .storeDurably()
                .build();
        Trigger trigger = TriggerBuilder
                .newTrigger()
                .withIdentity("reminders", "reminder-triggers")
                .withSchedule(
                        CronScheduleBuilder.cronSchedule("0 0 20 ? * * *"))
                .build();
        scheduler.scheduleJob(jobDetail, trigger);
    }
}
