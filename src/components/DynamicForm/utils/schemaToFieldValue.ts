import { FieldSchema, FieldValue, SchemaValue } from "../types";
import { IN_ARRAY_FIELD_VALUE } from "../const";

export const initializeFieldValue = (v: SchemaValue): FieldValue => {
    const value = typeof v === "function" ? v() : v;

    if (!(typeof value === "object")) {
        return typeof value === "number" ? String(value) : value;
    }

    if (Array.isArray(value)) {
        return value.map((childValue) => ({
            [IN_ARRAY_FIELD_VALUE]: initializeFieldValue(childValue),
        }));
    }

    return Object.fromEntries(
        Object.entries(value).map(([key, childValue]) => [
            key,
            initializeFieldValue(childValue),
        ])
    );
};

export const extractSchemaValue = (schema: FieldSchema): SchemaValue => {
    let fieldValue: SchemaValue;
    switch (schema.type) {
        case "int":
        case "float":
            fieldValue =
                schema.value ??
                schema.defaultValue ??
                schema.min ??
                (schema.max != null ? (schema.max > 0 ? 0 : schema.max) : 0);
            break;
        case "string":
            fieldValue = schema.value ?? schema.defaultValue ?? "";
            break;
        case "bool":
            fieldValue = schema.value ?? schema.defaultValue ?? false;
            break;
        case "date":
            fieldValue = schema.value ?? schema.defaultValue ?? "";
            break;
        case "array":
            fieldValue =
                schema.value ??
                schema.defaultValue ??
                new Array(schema.length ?? schema.min ?? 0)
                    .fill(0)
                    .map(() => extractSchemaValue(schema.items));
            break;
        case "object":
        default:
            fieldValue =
                schema.value ??
                schema.defaultValue ??
                Object.fromEntries(
                    Object.entries(schema.items).map(([key, childSchema]) => [
                        key,
                        extractSchemaValue(childSchema),
                    ])
                );
    }

    return fieldValue;
};

export const schemaToFieldValue = (schema: FieldSchema): FieldValue => {
    const fieldValue = extractSchemaValue(schema);

    return initializeFieldValue(fieldValue);
};
