package orogala.todolist.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import orogala.todolist.backend.model.Priority;
import orogala.todolist.backend.model.Task;
import orogala.todolist.backend.repository.PriorityRepository;
import orogala.todolist.backend.repository.TaskRepository;
import orogala.todolist.backend.service.MailService;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller
@CrossOrigin(origins = "http://localhost:5173")
public class MainController {
    @Autowired
    private PriorityRepository priorityRepository;
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private MailService mailService;

    @GetMapping(path="/tasks")
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = new ArrayList<Task>();
        taskRepository.findAll().forEach(tasks::add);
        if (tasks.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping(path="/tasks/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable("id") Integer id) {
        Optional<Task> taskData = taskRepository.findById(id);

        if (taskData.isPresent()) {
            return new ResponseEntity<>(taskData.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping(path="/tasks")
    public ResponseEntity<Task> addTask(@RequestBody Task task) {
        try {
            Task newTask = taskRepository.save(task);
            return new ResponseEntity<>(newTask, HttpStatus.CREATED);
        } catch(Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(path="/tasks/{id}")
    public ResponseEntity<Task> editTask(@RequestBody Task newTask, @PathVariable("id") Integer id) {
        Optional<Task> taskData = taskRepository.findById(id);

        if (taskData.isPresent()) {
            Task task = taskData.get();
            task.setTitle(newTask.getTitle());
            task.setDescription(newTask.getDescription());
            task.setStartDate(newTask.getStartDate());
            task.setEndDate(newTask.getEndDate());
            task.setPriority(newTask.getPriority());
            task.setFinished(newTask.getFinished());
            task.setAllDay(newTask.getAllDay());
            return new ResponseEntity<>(taskRepository.save(task), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(path="/tasks/{id}")
    public ResponseEntity<HttpStatus> deleteTask(@PathVariable("id") Integer id) {
        try {
            taskRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
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

    @GetMapping(path="/priorities/{id}")
    public ResponseEntity<Priority> getPriorityById(@PathVariable("id") Integer id) {
        Optional<Priority> priorityData = priorityRepository.findById(id);
        if (priorityData.isPresent()) {
            return new ResponseEntity<>(priorityData.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping(path="/sendmail")
    public ResponseEntity<HttpStatus> sendAttachmentMail(@RequestBody String file) {
        System.err.println(file);
        mailService.sendEmailWithAttachment(
                "oliwia.rogala97@gmail.com",
                "Task test",
                "Testing file sending",
                file);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
