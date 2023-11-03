package orogala.todolist.backend.model;

import java.time.LocalDate;
import java.util.Date;
import java.util.Objects;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String title;
    private String description;
    private Date start;
    private Date end;
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Priority priority;
    private Boolean finished;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getEnd() {
        return end;
    }

    public void setEnd(Date end) {
        this.end = end;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public Boolean getFinished() {
        return finished;
    }

    public void setFinished(Boolean finished) {
        this.finished = finished;
    }
}
