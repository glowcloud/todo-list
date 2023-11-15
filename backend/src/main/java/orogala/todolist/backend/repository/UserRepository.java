package orogala.todolist.backend.repository;

import org.springframework.data.repository.CrudRepository;
import orogala.todolist.backend.model.TodoUser;

import java.util.Optional;

public interface UserRepository  extends CrudRepository<TodoUser, Integer> {
    Optional<TodoUser> findByEmail(String email);
}
