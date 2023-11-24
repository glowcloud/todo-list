package orogala.todolist.backend.service;

import org.quartz.JobKey;
import org.quartz.Scheduler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import orogala.todolist.backend.model.Priority;
import orogala.todolist.backend.model.Task;
import orogala.todolist.backend.model.TodoUser;
import orogala.todolist.backend.repository.PriorityRepository;
import orogala.todolist.backend.repository.TaskRepository;
import orogala.todolist.backend.utils.TaskScheduleUtil;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ResponseService {
    @Autowired
    AuthenticationService authService;
    @Autowired
    TaskRepository taskRepository;
    @Autowired
    TaskScheduleUtil scheduleUtil;
    @Autowired
    Scheduler scheduler;
    @Autowired
    PriorityRepository priorityRepository;
    @Autowired
    MailService mailService;

    public ResponseEntity<List<Priority>> getPriorities() {
        List<Priority> priorities = new ArrayList<Priority>();
        priorityRepository.findAll().forEach(priorities::add);
        if (priorities.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(priorities, HttpStatus.OK);
    }

    public ResponseEntity<List<Task>> getTasks() {
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

    public ResponseEntity<Task> addTask(Task task) {
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

    public ResponseEntity<Task> editTask(Task newTask, Integer id) {
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
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    public ResponseEntity<HttpStatus> deleteTask(Integer id) {
        Optional<TodoUser> userData = authService.validateUser();
        if (userData.isPresent()) {
            Optional<Task> taskData = taskRepository.findById(id);
            if (taskData.isPresent() && Objects.equals(taskData.get().getUser().getId(), userData.get().getId())) {
                try {
                    taskRepository.deleteById(id);
                    scheduler.deleteJob(new JobKey(id.toString(), "email-jobs"));
                    return new ResponseEntity<>(HttpStatus.OK);
                } catch (Exception e) {
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    public ResponseEntity<HttpStatus> sendAttachmentMail(String file) {
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

    public ResponseEntity<HttpStatus> validateUser () {
        Optional<TodoUser> userData = authService.validateUser();
        if (userData.isPresent()) return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
}
