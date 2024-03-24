export type IntSchemaValue = number;
export type FloatSchemaValue = number;
export type StringSchemaValue = string;
export type BoolSchemaValue = boolean;
export type DateSchemaValue = string;

export type SchemaValue =
    | IntSchemaValue
    | FloatSchemaValue
    | StringSchemaValue
    | BoolSchemaValue
    | DateSchemaValue
    | (() => SchemaValue[])
    | SchemaValue[]
    | (() => { [K in string]: SchemaValue })
    | { [K in string]: SchemaValue }
    | undefined;

export type ArraySchemaValue<T extends SchemaValue = SchemaValue> = () => T[];

export type ObjectSchemaValue<
    T extends Record<string, SchemaValue> = Record<string, SchemaValue>
> = () => T;
