package orogala.todolist.backend.config;

import org.quartz.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import orogala.todolist.backend.job.ReminderJob;

@Configuration
public class RemindersConfig {
    @Autowired
    private Scheduler scheduler;

    @Bean
    public void scheduleReminders() throws SchedulerException {
        scheduler.deleteJob(new JobKey("reminders", "reminder-jobs"));

        JobDetail jobDetail = JobBuilder.newJob(ReminderJob.class)
                .withIdentity("reminders", "reminder-jobs")
                .storeDurably()
                .build();
        Trigger trigger = TriggerBuilder
                .newTrigger()
                .withIdentity("reminders", "reminder-triggers")
                .withSchedule(
                        CronScheduleBuilder.cronSchedule("0 0 20 ? * * *"))
                .build();
        scheduler.scheduleJob(jobDetail, trigger);
    }
}
