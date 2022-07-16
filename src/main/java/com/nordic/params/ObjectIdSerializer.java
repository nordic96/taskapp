package com.nordic.params;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.bson.types.ObjectId;

import java.io.IOException;

public class ObjectIdSerializer extends JsonSerializer<ObjectId> {
    @Override
    public void serialize(final ObjectId id, final JsonGenerator jsonGenerator, final SerializerProvider provider) throws IOException {
        jsonGenerator.writeString(id.toString());
    }
}
