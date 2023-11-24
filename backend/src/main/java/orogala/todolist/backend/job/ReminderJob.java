package orogala.todolist.backend.job;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Component;
import orogala.todolist.backend.model.Task;
import orogala.todolist.backend.repository.TaskRepository;
import orogala.todolist.backend.repository.UserRepository;
import orogala.todolist.backend.service.MailService;

import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Component
public class ReminderJob extends QuartzJobBean {
    @Autowired
    private MailService mailService;
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    protected void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        userRepository.findAll().forEach(user -> {
            List<Task> tasks = new ArrayList<Task>();
            Optional<ArrayList<Task>> tasksData =  taskRepository.findAllByUser_Id(user.getId());

            if (tasksData.isPresent()) {
                tasksData.get().forEach(task -> {
                    if (!task.getFinished()
                            && (task.getEndDate().before(new Date()) && task.getEndDate().getDay() != new Date().getDay())
                            || (task.getEndDate().before(new Date()) && task.getEndDate().getDay() == new Date().getDay())
                            && !task.getAllDay()) {
                        tasks.add(task);
                    }
                });

                if (!tasks.isEmpty()) {
                    String body = "Your unfinished tasks:\n\n";
                    for (Task task : tasks) {
                        body += task.getTitle();
                        body += " (start: ";
                        if (task.getAllDay()) {
                            body += DateTimeFormatter.ofPattern("dd/MM/yyyy")
                                    .format(task.getStartDate().toInstant().atZone(ZoneId.systemDefault()));
                        }
                        else {
                            body += DateTimeFormatter.ofPattern("dd/MM/yyyy hh:mm")
                                    .format(task.getStartDate().toInstant().atZone(ZoneId.systemDefault()));
                        }
                        body += ")\n";
                    }
                    mailService.sendEmail(user.getEmail(),
                            "You have " + tasks.size() + " unfinished tasks!",
                            body);
                }
            }
        });
    }
}
