package orogala.todolist.backend.repository;

import org.springframework.data.repository.CrudRepository;
import orogala.todolist.backend.model.Task;

import java.util.ArrayList;
import java.util.Optional;

public interface TaskRepository extends CrudRepository<Task, Integer>{

    Optional<ArrayList<Task>> findAllByUser_Id(Integer user_id);
}
