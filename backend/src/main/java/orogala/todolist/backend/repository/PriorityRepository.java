package orogala.todolist.backend.repository;

import org.springframework.data.repository.CrudRepository;
import orogala.todolist.backend.model.Priority;

public interface PriorityRepository extends CrudRepository<Priority, Integer> {

}
