package orogala.todolist.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import orogala.todolist.backend.model.Priority;
import orogala.todolist.backend.model.Task;
import orogala.todolist.backend.repository.PriorityRepository;
import orogala.todolist.backend.repository.TaskRepository;

import java.time.LocalDate;
import java.util.Optional;

@Controller
//@RequestMapping(path="/")
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
    public @ResponseBody String addTask (@RequestParam String title, @RequestParam String description,
                                         @RequestParam LocalDate date, @RequestParam Priority priority,
                                         @RequestParam Boolean finished) {
        Task t = new Task();
        t.setTitle(title);
        t.setDescription(description);
        t.setDate(date);
        t.setPriority(priority);
        t.setFinished(finished);
        taskRepository.save(t);
        return "Saved";
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
