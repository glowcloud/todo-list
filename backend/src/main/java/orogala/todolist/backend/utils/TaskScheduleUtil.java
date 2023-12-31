package orogala.todolist.backend.utils;

import org.quartz.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import orogala.todolist.backend.job.EmailJob;
import orogala.todolist.backend.model.Task;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import static org.quartz.SimpleScheduleBuilder.simpleSchedule;

@Component
public class TaskScheduleUtil {
    @Autowired
    private Scheduler scheduler;

    private JobDetail buildJobDetail(String email, String subject, String body, String id) {
        JobDataMap jobDataMap = new JobDataMap();

        jobDataMap.put("email", email);
        jobDataMap.put("subject", subject);
        jobDataMap.put("body", body);

        return JobBuilder.newJob(EmailJob.class)
                .withIdentity(id, "email-jobs")
                .withDescription("Send Email Job")
                .usingJobData(jobDataMap)
                .storeDurably()
                .build();
    }

    private Trigger buildJobTrigger(JobDetail jobDetail, ZonedDateTime startAt) {
        return TriggerBuilder.newTrigger()
                .forJob(jobDetail)
                .withIdentity(jobDetail.getKey().getName(), "email-triggers")
                .withDescription("Send Email Trigger")
                .startAt(Date.from(startAt.toInstant()))
                .withSchedule(simpleSchedule().withMisfireHandlingInstructionFireNow())
                .build();
    }

    public void scheduleTask(Task task, String email) throws SchedulerException {
        ZonedDateTime dateTime = task.getStartDate().toInstant().atZone(ZoneId.systemDefault()).minusMinutes(15);
        String mailBody = "";
        String start = "";
        String end = "";

        if (task.getAllDay()) {
            mailBody = "All day task\n";
            start = DateTimeFormatter.ofPattern("dd/MM/yyyy")
                    .format(task.getStartDate().toInstant().atZone(ZoneId.systemDefault()));
            end = DateTimeFormatter.ofPattern("dd/MM/yyyy")
                    .format(task.getEndDate().toInstant().atZone(ZoneId.systemDefault()));
        }
        else {
            start = DateTimeFormatter.ofPattern("dd/MM/yyyy hh:mm a")
                    .format(task.getStartDate().toInstant().atZone(ZoneId.systemDefault()));
            end = DateTimeFormatter.ofPattern("dd/MM/yyyy hh:mm a")
                    .format(task.getEndDate().toInstant().atZone(ZoneId.systemDefault()));
        }

        mailBody += "Start: "
                + start
                + "\nEnd: "
                + end
                + "\n\n"
                + task.getDescription();

        JobDetail jobDetail = buildJobDetail(email,
                "Upcoming task: " + task.getTitle(),
                mailBody,
                task.getId().toString()
        );
        Trigger trigger = buildJobTrigger(jobDetail, dateTime);
        scheduler.scheduleJob(jobDetail, trigger);
    }
}
