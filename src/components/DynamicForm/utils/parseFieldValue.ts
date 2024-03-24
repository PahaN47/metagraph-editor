import { IN_ARRAY_FIELD_VALUE } from "../const";
import {
    ArrayFieldValue,
    FieldSchema,
    FieldValue,
    ObjectFieldValue,
    ParsedFieldValue,
} from "../types";

export const parseFieldValue = (
    value: FieldValue,
    schema: FieldSchema
): ParsedFieldValue => {
    if (value === "" || value == null) {
        return undefined;
    }
    switch (schema?.type) {
        case "int":
        case "float":
            return +value;
        case "array":
            return (value as ArrayFieldValue).map(
                ({ [IN_ARRAY_FIELD_VALUE]: childValue }) =>
                    parseFieldValue(childValue, schema.items)
            );
        case "object":
            return Object.fromEntries(
                Object.entries(value as ObjectFieldValue).map(
                    ([key, childValue]) => [
                        key,
                        parseFieldValue(childValue, schema.items[key]),
                    ]
                )
            );
        default:
            return value;
    }
};
