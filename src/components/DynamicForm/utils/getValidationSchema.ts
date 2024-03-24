import {
    AnyObject,
    ArraySchema,
    BooleanSchema,
    DateSchema,
    Maybe,
    NumberSchema,
    ObjectSchema,
    StringSchema,
    array,
    boolean,
    date,
    number,
    object,
    string,
} from "yup";
import {
    ArrayFieldSchema,
    BoolFieldSchema,
    DateFieldSchema,
    FieldSchema,
    FloatFieldSchema,
    IntFieldSchema,
    ObjectFieldSchema,
    StringFieldSchema,
} from "../types";

export const getValidationNumberSchema = ({
    type,
    min,
    max,
    lessThan,
    moreThan,
    positive,
    negative,
    defaultValue,
    nullable,
}: IntFieldSchema | FloatFieldSchema) => {
    let schema = number().strict() as unknown as NumberSchema<
        number | null | undefined,
        AnyObject,
        number,
        "d"
    >;
    if (type == "int") {
        schema = schema.integer();
    }
    if (min != null) {
        schema = schema.min(min);
    }
    if (max != null) {
        schema = schema.max(max);
    }
    if (lessThan != null) {
        schema = schema.lessThan(lessThan);
    }
    if (moreThan != null) {
        schema = schema.moreThan(moreThan);
    }
    if (positive) {
        schema = schema.positive();
    }
    if (negative) {
        schema = schema.negative();
    }
    if (defaultValue != null) {
        schema = schema.default(defaultValue);
    }
    if (nullable) {
        schema = schema.optional();
    } else {
        schema = schema.required();
    }

    return schema;
};

export const getStringValidationSchema = ({
    length,
    min,
    max,
    matches,
    email,
    url,
    uuid,
    lowercase,
    uppercase,
    defaultValue,
    nullable,
}: StringFieldSchema) => {
    let schema = string().strict() as unknown as StringSchema<
        string | null | undefined,
        AnyObject,
        string,
        "d"
    >;

    if (length != null) {
        schema = schema.length(length);
    }
    if (min != null) {
        schema = schema.min(min);
    }
    if (max != null) {
        schema = schema.max(max);
    }
    if (matches != null) {
        schema = schema.matches(matches.regex, {
            excludeEmptyString: matches.excludeEmpty,
        });
    }
    if (email) {
        schema = schema.email();
    }
    if (url) {
        schema = schema.url();
    }
    if (uuid) {
        schema = schema.uuid();
    }
    if (lowercase) {
        schema = schema.lowercase();
    }
    if (uppercase) {
        schema = schema.uppercase();
    }
    if (defaultValue != null) {
        schema = schema.default(defaultValue);
    }
    if (nullable) {
        schema = schema.optional();
    } else {
        schema = schema.required();
    }

    return schema;
};

export const getBoolValidationSchema = ({
    defaultValue,
    nullable,
}: BoolFieldSchema) => {
    let schema = boolean().strict() as unknown as BooleanSchema<
        boolean | null | undefined,
        AnyObject,
        boolean,
        "d"
    >;

    if (defaultValue != null) {
        schema = schema.default(defaultValue);
    }
    if (nullable) {
        schema = schema.optional();
    } else {
        schema = schema.required();
    }

    return schema;
};

export const getDateValidationSchema = ({
    min,
    max,
    defaultValue,
    nullable,
}: DateFieldSchema) => {
    let schema = date() as unknown as DateSchema<
        Date | null | undefined,
        AnyObject,
        Date,
        "d"
    >;

    if (min != null) {
        schema = schema.min(min);
    }
    if (max != null) {
        schema = schema.max(max);
    }
    if (defaultValue != null) {
        schema = schema.default(new Date(defaultValue));
    }
    if (nullable) {
        schema = schema.optional();
    } else {
        schema = schema.required();
    }

    return schema;
};

export const getArrayValidationSchema = ({
    length,
    min,
    max,
    defaultValue,
    nullable,
    items,
}: ArrayFieldSchema) => {
    let schema = array()
        .strict()
        .of(getValidationSchema(items)) as unknown as ArraySchema<
        (object | null)[] | null | undefined,
        AnyObject,
        (object | null)[] | null | undefined,
        ""
    >;

    if (length != null) {
        schema = schema.length(length);
    }
    if (min != null) {
        schema = schema.min(min);
    }
    if (max != null) {
        schema = schema.max(max);
    }
    if (defaultValue != null) {
        schema = schema.default(
            defaultValue as unknown as Maybe<(object | null)[] | undefined>
        );
    }
    if (nullable) {
        schema = schema.optional();
    } else {
        schema = schema.required();
    }

    return schema;
};

export const getObjectValidationSchema = ({
    defaultValue,
    nullable,
    items,
}: ObjectFieldSchema) => {
    const children = Object.fromEntries(
        Object.entries(items).map(([key, item]) => [
            key,
            getValidationSchema(item),
        ])
    );
    let schema = object(children).strict() as unknown as ObjectSchema<
        object | null | undefined,
        AnyObject,
        AnyObject,
        "d"
    >;

    if (defaultValue != null) {
        schema = schema.default(defaultValue);
    }
    if (nullable) {
        schema = schema.optional();
    } else {
        schema = schema.required();
    }

    return schema;
};

export const getValidationSchema = (field: FieldSchema) => {
    switch (field.type) {
        case "int":
        case "float":
            return getValidationNumberSchema(field);
        case "string":
            return getStringValidationSchema(field);
        case "bool":
            return getBoolValidationSchema(field);
        case "date":
            return getDateValidationSchema(field);
        case "array":
            return getArrayValidationSchema(field);
        case "object":
        default:
            return getObjectValidationSchema(field);
    }
};
