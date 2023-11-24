package orogala.todolist.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import orogala.todolist.backend.model.LoginResponse;
import orogala.todolist.backend.model.Priority;
import orogala.todolist.backend.model.Task;
import orogala.todolist.backend.model.TodoUser;
import orogala.todolist.backend.service.AuthenticationService;
import orogala.todolist.backend.service.ResponseService;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class MainController {
    @Autowired
    private AuthenticationService authService;
    @Autowired
    ResponseService responseService;

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
        return responseService.getTasks();
    }

    @PostMapping(path="/tasks")
    public ResponseEntity<Task> addTask(@RequestBody Task task) {
        return  responseService.addTask(task);
    }

    @PutMapping(path="/tasks/{id}")
    public ResponseEntity<Task> editTask(@RequestBody Task task, @PathVariable("id") Integer id) {
        return responseService.editTask(task, id);
    }

    @DeleteMapping(path="/tasks/{id}")
    public ResponseEntity<HttpStatus> deleteTask(@PathVariable("id") Integer id) {
        return responseService.deleteTask(id);
    }

    @GetMapping(path="/priorities")
    public ResponseEntity<List<Priority>> getAllPriorities() {
        return responseService.getPriorities();
    }

    @PostMapping(path="/sendmail")
    public ResponseEntity<HttpStatus> sendAttachmentMail(@RequestBody String file) {
        return responseService.sendAttachmentMail(file);
    }

    @GetMapping(path="/validate")
    public ResponseEntity<HttpStatus> validateUser () {
        return responseService.validateUser();
    }
}
