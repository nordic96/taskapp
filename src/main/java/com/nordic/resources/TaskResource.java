package com.nordic.resources;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.codahale.metrics.annotation.Timed;
import com.nordic.api.Task;
import com.nordic.dao.TaskDAO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Path("/tasks")
@Produces(MediaType.APPLICATION_JSON)
public class TaskResource {
    private TaskDAO taskDAO;
    private static final Logger logger = LoggerFactory.getLogger(TaskResource.class);
    public TaskResource(final TaskDAO taskDAO) {
        this.taskDAO = taskDAO;
    }

    @GET
    @Timed
    public List<Task> fetchTasks() {
        logger.info("Fetching all tasks");
        return taskDAO.fetchTasks();
    }
}
