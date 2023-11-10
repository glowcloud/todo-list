package orogala.todolist.backend.job;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Component;
import orogala.todolist.backend.model.Task;
import orogala.todolist.backend.repository.TaskRepository;
import orogala.todolist.backend.service.MailService;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class ReminderJob extends QuartzJobBean {
    @Autowired
    private MailService mailService;
    @Autowired
    private TaskRepository taskRepository;

    @Override
    protected void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {
//        for every user get tasks
//        if any overdue tasks: send mail

        List<Task> tasks = new ArrayList<Task>();
        taskRepository.findAll().forEach(task -> {
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
                body += "\n";
            }
            String subject = "You have unfinished tasks!";
            mailService.sendEmail("oliwia.rogala97@gmail.com",
                    "You have unfinished tasks!",
                    body);
        }
    }
}
