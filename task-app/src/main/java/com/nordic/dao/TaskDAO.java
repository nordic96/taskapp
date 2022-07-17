package com.nordic.dao;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.ReplaceOptions;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.InsertOneResult;
import com.mongodb.client.result.UpdateResult;
import com.nordic.api.Task;
import com.nordic.params.TaskMapper;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

public class TaskDAO {
    final MongoCollection<Document> taskCollection;
    static final Logger logger = LoggerFactory.getLogger(TaskDAO.class);

    public TaskDAO(final MongoCollection<Document> taskCollection) {
        this.taskCollection = taskCollection;
    }

    public List<Task> fetchTasks() {
        final MongoCursor<Document> tasks = taskCollection.find().iterator();
        final List<Task> arr = new ArrayList<Task>();

        try {
            while (tasks.hasNext()) {
                arr.add(TaskMapper.map(tasks.next()));
            }
        } catch (Exception e) {
            logger.error(e.toString());
        } finally {
            tasks.close();
        }

        return arr;
    }

    /**
     * Inserts one single Task
     * @param task new Task to be added
     * @return InsertOneResult from MongoDB
     */
    public InsertOneResult insertTask(final Task task) {
        final Document document = new Document("completed", task.getCompleted()).append("desc", task.getDesc());
        return taskCollection.insertOne(document);
    }

    /**
     * Updates a Task based on the ID given
     * @param id Object ID for updating
     * @param task New Task entity to update
     */
    public UpdateResult updateTask(final ObjectId id, final Task task) {
        Bson filter = Filters.eq("_id", id);
        Document update = new Document("desc", task.getDesc()).append("completed", task.getCompleted());
        ReplaceOptions options = new ReplaceOptions().upsert(true);

        return taskCollection.replaceOne(filter, update, options);
    }

    /**
     * Deletes a task from collection that has given object id
     * @param id Object ID for deleting
     */
    public DeleteResult deleteTask(final ObjectId id) {
        return taskCollection.deleteOne(new Document("_id", id));
    }
}
