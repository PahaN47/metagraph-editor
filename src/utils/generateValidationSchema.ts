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
    ArrayField,
    BoolField,
    DateField,
    FloatField,
    FormField,
    IntField,
    ObjectField,
    StringField,
} from "../types";

export const generateNumberSchema = ({
    type,
    min,
    max,
    lessThan,
    moreThan,
    positive,
    negative,
    defaultValue,
    nullable,
}: IntField | FloatField) => {
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
        schema = schema.nullable();
    } else {
        schema = schema.required();
    }

    return schema;
};

export const generateStringSchema = ({
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
}: StringField) => {
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
        schema = schema.nullable();
    } else {
        schema = schema.required();
    }

    return schema;
};

export const generateBoolSchema = ({ defaultValue, nullable }: BoolField) => {
    let schema = boolean() as unknown as BooleanSchema<
        boolean | null | undefined,
        AnyObject,
        boolean,
        "d"
    >;

    if (defaultValue != null) {
        schema = schema.default(defaultValue);
    }
    if (nullable) {
        schema = schema.nullable();
    } else {
        schema = schema.required();
    }

    return schema;
};

export const generateDateSchema = ({
    min,
    max,
    defaultValue,
    nullable,
}: DateField) => {
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
        schema = schema.default(defaultValue);
    }
    if (nullable) {
        schema = schema.nullable();
    } else {
        schema = schema.required();
    }

    return schema;
};

export const generateArraySchema = ({
    length,
    min,
    max,
    defaultValue,
    nullable,
    items,
}: ArrayField) => {
    let schema = array().of(
        generateValidationSchema(items)
    ) as unknown as ArraySchema<
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
        schema = schema.nullable();
    } else {
        schema = schema.required();
    }

    return schema;
};

export const generateObjectSchema = ({
    defaultValue,
    nullable,
    items,
}: ObjectField) => {
    const children = Object.fromEntries(
        Object.entries(items).map(([key, item]) => [
            key,
            generateValidationSchema(item),
        ])
    );
    let schema = object(children) as unknown as ObjectSchema<
        object | null,
        AnyObject,
        AnyObject,
        "d"
    >;

    if (defaultValue != null) {
        schema = schema.default(defaultValue);
    }
    if (nullable) {
        schema = schema.nullable();
    } else {
        schema = schema.required();
    }

    return schema;
};

export const generateValidationSchema = (field: FormField) => {
    switch (field.type) {
        case "int":
        case "float":
            return generateNumberSchema(field);
        case "string":
            return generateStringSchema(field);
        case "bool":
            return generateBoolSchema(field);
        case "date":
            return generateDateSchema(field);
        case "array":
            return generateArraySchema(field);
        case "object":
        default:
            return generateObjectSchema(field);
    }
};
