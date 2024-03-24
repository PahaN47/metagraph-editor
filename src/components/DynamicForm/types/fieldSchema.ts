import {
    ArraySchemaValue,
    BoolSchemaValue,
    DateSchemaValue,
    SchemaValue,
    FloatSchemaValue,
    IntSchemaValue,
    ObjectSchemaValue,
    StringSchemaValue,
} from "./schemaValue";

export type IntFieldSchema = {
    type: "int";
    min?: number;
    max?: number;
    lessThan?: number;
    moreThan?: number;
    positive?: boolean;
    negative?: boolean;
    value?: IntSchemaValue;
    defaultValue?: IntSchemaValue;
    nullable?: boolean;
};

export type FloatFieldSchema = {
    type: "float";
    min?: number;
    max?: number;
    lessThan?: number;
    moreThan?: number;
    positive?: boolean;
    negative?: boolean;
    value?: FloatSchemaValue;
    defaultValue?: FloatSchemaValue;
    nullable?: boolean;
};

export type StringFieldSchema = {
    type: "string";
    length?: number;
    min?: number;
    max?: number;
    matches?: { regex: RegExp; excludeEmpty?: boolean };
    email?: boolean;
    url?: boolean;
    uuid?: boolean;
    lowercase?: boolean;
    uppercase?: boolean;
    value?: StringSchemaValue;
    defaultValue?: StringSchemaValue;
    nullable?: boolean;
};

export type BoolFieldSchema = {
    type: "bool";
    value?: BoolSchemaValue;
    defaultValue?: BoolSchemaValue;
    nullable?: boolean;
};

export type DateFieldSchema = {
    type: "date";
    min?: Date;
    max?: Date;
    value?: DateSchemaValue;
    defaultValue?: DateSchemaValue;
    nullable?: boolean;
};

export type PrimitiveFieldSchema =
    | IntFieldSchema
    | FloatFieldSchema
    | StringFieldSchema
    | BoolFieldSchema
    | DateFieldSchema;

export type ArrayFieldSchema<T extends SchemaValue = SchemaValue> = {
    type: "array";
    length?: number;
    min?: number;
    max?: number;
    value?: ArraySchemaValue<T>;
    defaultValue?: ArraySchemaValue<T>;
    nullable?: boolean;
    items: FieldSchema;
};

export type ObjectFieldSchema<
    T extends Record<string, SchemaValue> = Record<string, SchemaValue>
> = {
    type: "object";
    value?: () => ObjectSchemaValue<T>;
    defaultValue?: () => ObjectSchemaValue<T>;
    nullable?: boolean;
    items: {
        [K in string]: FieldSchema;
    };
};

export type FieldSchema =
    | IntFieldSchema
    | FloatFieldSchema
    | StringFieldSchema
    | BoolFieldSchema
    | DateFieldSchema
    | ArrayFieldSchema
    | ObjectFieldSchema;
