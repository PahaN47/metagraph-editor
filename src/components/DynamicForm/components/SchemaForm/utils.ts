import { IN_ARRAY_FIELD_VALUE_REGEX_INNER } from "../../const";
import { FieldSchema, ObjectFieldSchema } from "../../types";
import { getFieldsFromSchema } from "../../utils";
import {
    ARRAY_FORM_FIELD_SCHEMA,
    BOOL_FORM_FIELD_SCHEMA,
    DATE_FORM_FIELD_SCHEMA,
    FLOAT_FORM_FIELD_SCHEMA,
    INT_FORM_FIELD_SCHEMA,
    OBJECT_FIELD_SCHEMA,
    STRING_FORM_FIELD_SCHEMA,
} from "./const";

export const parseName = (name?: string) =>
    name?.replace(
        new RegExp(
            IN_ARRAY_FIELD_VALUE_REGEX_INNER.source,
            IN_ARRAY_FIELD_VALUE_REGEX_INNER.flags + "g"
        ),
        "[i]"
    );

export const getSchemaFormSchema = (schemaType: FieldSchema["type"]) => {
    switch (schemaType) {
        case "int":
            return INT_FORM_FIELD_SCHEMA;
        case "float":
            return FLOAT_FORM_FIELD_SCHEMA;
        case "string":
            return STRING_FORM_FIELD_SCHEMA;
        case "bool":
            return BOOL_FORM_FIELD_SCHEMA;
        case "date":
            return DATE_FORM_FIELD_SCHEMA;
        case "array":
            return ARRAY_FORM_FIELD_SCHEMA;
        case "object":
        default:
            return OBJECT_FIELD_SCHEMA;
    }
};

export const getSchemaInputs = (fieldSchema: ObjectFieldSchema) => {
    const filteredFieldSchema = Object.fromEntries(
        Object.entries(fieldSchema).filter(([key]) => key !== "value")
    ) as ObjectFieldSchema;
    return getFieldsFromSchema(filteredFieldSchema);
};
