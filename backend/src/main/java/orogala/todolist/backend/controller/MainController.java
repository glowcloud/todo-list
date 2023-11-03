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
import java.util.Optional;

@Controller
@CrossOrigin(origins = "http://localhost:5173")
public class MainController {
    @Autowired
    private PriorityRepository priorityRepository;
    @Autowired
    private TaskRepository taskRepository;

    @GetMapping(path="/tasks")
    public @ResponseBody Iterable<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @GetMapping(path="/tasks/{id}")
    public @ResponseBody Optional<Task> getTaskById(@PathVariable("id") Integer id) {
        return taskRepository.findById(id);
    }

    @PostMapping(path="/tasks")
    public @ResponseBody Task addTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }

    @PutMapping(path="/tasks/{id}")
    public ResponseEntity<Task> editTask(@RequestBody Task newTask, @PathVariable("id") Integer id) {
        Optional<Task> taskData = taskRepository.findById(id);

        if (taskData.isPresent()) {
            Task task = taskData.get();
            task.setTitle(newTask.getTitle());
            task.setDescription(newTask.getDescription());
            task.setStart(newTask.getStart());
            task.setEnd(newTask.getEnd());
            task.setPriority(newTask.getPriority());
            task.setFinished(newTask.getFinished());
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
    public @ResponseBody Iterable<Priority> getAllPriorities() {
        return priorityRepository.findAll();
    }

    @GetMapping(path="/priorities/{id}")
    public @ResponseBody Optional<Priority> getPriorityById(@PathVariable("id") Integer id) {
        return priorityRepository.findById(id);
    }

}
