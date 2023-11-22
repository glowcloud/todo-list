package orogala.todolist.backend.controller;

import org.quartz.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import orogala.todolist.backend.model.LoginResponse;
import orogala.todolist.backend.model.Priority;
import orogala.todolist.backend.model.Task;
import orogala.todolist.backend.model.TodoUser;
import orogala.todolist.backend.repository.PriorityRepository;
import orogala.todolist.backend.repository.TaskRepository;
import orogala.todolist.backend.service.AuthenticationService;
import orogala.todolist.backend.service.MailService;
import orogala.todolist.backend.utils.TaskScheduleUtil;
import java.util.*;

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
    TaskScheduleUtil scheduleUtil;

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
        Optional<TodoUser> userData = authService.validateUser();
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
        Optional<TodoUser> userData = authService.validateUser();
        if (userData.isPresent()) {
            try {
                task.setUser(userData.get());
                Task newTask = taskRepository.save(task);
                scheduleUtil.scheduleTask(newTask, userData.get().getEmail());
                return new ResponseEntity<>(newTask, HttpStatus.CREATED);
            } catch(Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PutMapping(path="/tasks/{id}")
    public ResponseEntity<Task> editTask(@RequestBody Task newTask, @PathVariable("id") Integer id) {
        Optional<TodoUser> userData = authService.validateUser();
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
                        scheduleUtil.scheduleTask(task, task.getUser().getEmail());
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
        Optional<TodoUser> userData = authService.validateUser();
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
        Optional<TodoUser> userData = authService.validateUser();
        if (userData.isPresent()) {
            mailService.sendEmailWithAttachment(
                    userData.get().getEmail(),
                    "New task",
                    file);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping(path="/validate")
    public ResponseEntity<HttpStatus> validateToken () {
        Optional<TodoUser> userData = authService.validateUser();
        if (userData.isPresent()) return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
}
