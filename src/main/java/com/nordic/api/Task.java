package com.nordic.api;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Task {
    private final long id;
    private final boolean completed;

    public Task(final long id, final boolean completed) {
        this.id = id;
        this.completed = completed;
    }

    @JsonProperty
    public long getId() {
        return this.id;
    }

    @JsonProperty
    public boolean getCompleted() {
        return this.completed;
    }
}
