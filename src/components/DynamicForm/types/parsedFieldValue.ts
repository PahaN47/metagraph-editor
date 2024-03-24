export type ParsedIntFieldValue = number;
export type ParsedFloatFieldValue = number;
export type ParsedStringFieldValue = string;
export type ParsedBoolFieldValue = boolean;
export type ParsedDateFieldValue = string;

export type ParsedFieldValue =
    | ParsedIntFieldValue
    | ParsedFloatFieldValue
    | ParsedStringFieldValue
    | ParsedBoolFieldValue
    | ParsedDateFieldValue
    | ParsedFieldValue[]
    | { [K in string]: ParsedFieldValue }
    | undefined;

export type ParsedArrayFieldValue<
    T extends ParsedFieldValue = ParsedFieldValue
> = T[];

export type ParsedObjectFieldValue<
    T extends Record<string, ParsedFieldValue> = Record<
        string,
        ParsedFieldValue
    >
> = T;
