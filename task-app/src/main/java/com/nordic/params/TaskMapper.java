package com.nordic.params;

import com.nordic.api.Task;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.Date;

public class TaskMapper {
    /**
     * Mapper Function to map from MongoDB object to Task Entity Model
     * @param taskDocument
     * @return
     */
    public static Task map(final Document taskDocument) {
        boolean completed = taskDocument.getBoolean("completed");
        ObjectId id = taskDocument.getObjectId("_id");
        String desc = taskDocument.getString("desc");
        Date due = taskDocument.getDate("due");
        final Task task = new Task();
        task.setId(id);
        task.setCompleted(completed);
        task.setDesc(desc);
        task.setCreated(id.getDate());
        task.setDue(due);
        return task;
    }
}
