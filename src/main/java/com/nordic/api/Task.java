package com.nordic.api;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.bson.types.ObjectId;

public class Task {
    private final ObjectId id;
    private boolean completed;
    private String desc;

    public Task(final ObjectId id, boolean completed, String desc) {
        this.id = id;
        this.completed = completed;
        this.desc = desc;
    }

    public ObjectId getId() {
        return this.id;
    }

    public boolean getCompleted() {
        return this.completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public String getDesc() {
        return this.desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }
}
