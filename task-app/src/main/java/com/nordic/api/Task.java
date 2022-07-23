package com.nordic.api;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.nordic.params.ObjectIdSerializer;
import org.bson.types.ObjectId;

import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * POJO Model for Task Entity
 */
public class Task {
    @JsonSerialize(using = ObjectIdSerializer.class)
    private ObjectId id;
    @NotNull
    private boolean completed;
    @NotNull
    private String desc;

    private Date created;

    private Date due;


    public Task() {}

    public ObjectId getId() {
        return this.id;
    }

    public void setId(ObjectId id) {
        this.id = id;
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

    public Date getCreated() {
        return this.created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Date getDue() {
        return this.due;
    }

    public void setDue(Date due) {
        this.due = due;
    }
}
