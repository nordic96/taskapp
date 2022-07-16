package com.nordic.resources;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.codahale.metrics.annotation.Timed;
import com.nordic.api.Task;

@Path("/tasks")
@Produces(MediaType.APPLICATION_JSON)
public class TaskResource {
    public TaskResource() {
    }

    @GET
    @Timed
    public List<Task> fetchTasks() {
        Task testTask = new Task(1, false);
        List<Task> tasks = new ArrayList<Task>();
        tasks.add(testTask);
        return tasks;
    }
}
