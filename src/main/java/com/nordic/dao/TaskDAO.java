package com.nordic.dao;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.nordic.api.Task;
import com.nordic.params.TaskMapper;
import org.bson.Document;
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
}
