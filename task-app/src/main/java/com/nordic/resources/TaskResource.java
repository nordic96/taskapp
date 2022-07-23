package com.nordic.resources;

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
import io.swagger.annotations.*;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Path("/tasks")
@Api(value = "/tasks", tags = "Task", description = "operations related to tasks")
@Produces(MediaType.APPLICATION_JSON)
public class TaskResource {
    private TaskDAO taskDAO;
    private static final Logger logger = LoggerFactory.getLogger(TaskResource.class);
    public TaskResource(final TaskDAO taskDAO) {
        this.taskDAO = taskDAO;
    }

    @GET
    @Timed
    @ApiOperation(
            value = "Fetch All Tasks from collection",
            notes = "sort by creation order is not provided",
            response = Task.class, responseContainer = "List")
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
    @ApiOperation(value = "Create new task and add it to Task Collections", notes = "Single update operation")
    @ApiResponses(value = { @ApiResponse(code = 500, message = "Unable to create task"), @ApiResponse(code = 200, message = "Unix Time value of created task") })
    public Response createTask(@NotNull final Task task) {
        logger.info("Creating new Task");
        InsertOneResult result = taskDAO.insertTask(task);
        if (result.wasAcknowledged()) {
            return Response.ok(task.getCreated()).build();
        }
        return Response.status(500, "Unable to create task").build();
    }

    @PUT
    @Timed
    @Path("/action/update/{id}")
    @ApiOperation(value = "Update existing task in collection using given id", notes = "single operation, id must be valid")
    @ApiResponses(value = { @ApiResponse(code = 500, message = "Unable to update"), @ApiResponse(code = 200, message = "Unix Time value of updated task") })
    public Response updateTask(@ApiParam(value = "task id to be updated", required = true) @PathParam("id") @NotNull final ObjectId id, @NotNull final Task task) {
        logger.info("Update Task");
        UpdateResult result = taskDAO.updateTask(id, task);
        if (result.wasAcknowledged() && result.getMatchedCount() <= 0) {
            return Response.status(500, "Unable to update").build();
        }
        return Response.ok(task.getCreated()).build();
    }

    @DELETE
    @Timed
    @Path("/action/delete/{id}")
    @ApiOperation(value = "Delete single Task by ID", notes = "single operation, id must be valid")
    @ApiResponses(value = { @ApiResponse(code = 500, message = "Unable to delete"), @ApiResponse(code = 200, message = "ID of deleted task") })
    public Response deleteTask(@ApiParam(value = "task id to be deleted", required = true) @PathParam("id") @NotNull final ObjectId id) {
        DeleteResult result = taskDAO.deleteTask(id);
        if (result.wasAcknowledged()) {
            return Response.ok(id).build();
        }
        return Response.status(500, "Unable to delete").build();
    }
}
