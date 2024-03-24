import { IN_ARRAY_FIELD_VALUE } from "../const";

export type IntFieldValue = string;
export type FloatFieldValue = string;
export type StringFieldValue = string;
export type BoolFieldValue = boolean;
export type DateFieldValue = string;

export type FieldValue =
    | IntFieldValue
    | FloatFieldValue
    | StringFieldValue
    | BoolFieldValue
    | DateFieldValue
    | { [IN_ARRAY_FIELD_VALUE]: FieldValue }[]
    | { [K in string]: FieldValue };

export type ArrayFieldValue<T extends FieldValue = FieldValue> = {
    [IN_ARRAY_FIELD_VALUE]: T;
}[];

export type ObjectFieldValue<
    T extends Record<string, FieldValue> = Record<string, FieldValue>
> = T;
