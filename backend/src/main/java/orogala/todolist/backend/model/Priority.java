package orogala.todolist.backend.model;

import java.util.Objects;

import jakarta.persistence.*;

import javax.validation.constraints.NotNull;

@Entity
public class Priority {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @NotNull
    private String name;
    private String color;

    public Integer getId() {
        return id;
    }

    public String getColor() {
        return color;
    }

    public String getName() {
        return name;
    }
}
