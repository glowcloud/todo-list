package orogala.todolist.backend.repository;

import org.springframework.data.repository.CrudRepository;
import orogala.todolist.backend.model.Task;

public interface TaskRepository extends CrudRepository<Task, Integer>{
}
