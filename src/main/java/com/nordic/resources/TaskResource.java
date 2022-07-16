package com.nordic.resources;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotNull;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.codahale.metrics.annotation.Timed;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.InsertOneResult;
import com.mongodb.client.result.UpdateResult;
import com.nordic.api.Task;
import com.nordic.dao.TaskDAO;
import org.bson.types.ObjectId;
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
    public Response fetchTasks() {
        logger.info("Fetching all tasks");
        final List<Task> tasks = taskDAO.fetchTasks();
        if (tasks.isEmpty()) {
            return Response.noContent().build();
        }
        return Response.ok(taskDAO.fetchTasks()).build();
    }

    @POST
    @Timed
    @Path("/action/add")
    public Response createTask(@NotNull final Task task) {
        logger.info("Creating new Task");
        InsertOneResult result = taskDAO.insertTask(task);
        if (result.wasAcknowledged()) {
            return Response.ok("Success").build();
        }
        return Response.status(500, "Unable to create task").build();
    }

    @PUT
    @Timed
    @Path("/action/update/{id}")
    public Response updateTask(@PathParam("id") @NotNull final ObjectId id, @NotNull final Task task) {
        logger.info("Update Task");
        UpdateResult result = taskDAO.updateTask(id, task);
        if (result.wasAcknowledged() && result.getMatchedCount() <= 0) {
            return Response.status(500, "Unable to update").build();
        }
        return Response.ok("Success").build();
    }

    @DELETE
    @Timed
    @Path("/action/delete/{id}")
    public Response deleteTask(@PathParam("id") @NotNull final ObjectId id) {
        DeleteResult result = taskDAO.deleteTask(id);
        if (result.wasAcknowledged()) {
            return Response.ok("Success").build();
        }
        return Response.status(500, "Unable to delete").build();
    }
}
