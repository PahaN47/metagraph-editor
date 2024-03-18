export type IntField = {
    type: "int";
    min?: number;
    max?: number;
    lessThan?: number;
    moreThan?: number;
    positive?: boolean;
    negative?: boolean;
    value?: number;
    defaultValue?: number;
    nullable?: boolean;
};

export type FloatField = {
    type: "float";
    min?: number;
    max?: number;
    lessThan?: number;
    moreThan?: number;
    positive?: boolean;
    negative?: boolean;
    value?: number;
    defaultValue?: number;
    nullable?: boolean;
};

export type StringField = {
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
    value?: string;
    defaultValue?: string;
    nullable?: boolean;
};

export type BoolField = {
    type: "bool";
    value?: boolean;
    defaultValue?: boolean;
    nullable?: boolean;
};

export type DateField = {
    type: "date";
    min?: Date;
    max?: Date;
    value?: () => Date;
    defaultValue?: () => Date;
    nullable?: boolean;
};

export type PrimitiveField =
    | IntField
    | FloatField
    | StringField
    | BoolField
    | DateField;

export type FieldValue =
    | number
    | string
    | boolean
    | Date
    | ArrayFieldValue
    | ObjectFieldValue
    | undefined;

export type ArrayFieldValue = FieldValue[];

export type ObjectFieldValue = {
    [K: string]: FieldValue;
};

export type ArrayField = {
    type: "array";
    length?: number;
    min?: number;
    max?: number;
    value?: () => ArrayFieldValue;
    defaultValue?: () => ArrayFieldValue;
    nullable?: boolean;
    items: FormField;
};

export type ObjectField = {
    type: "object";
    value?: () => ObjectFieldValue;
    defaultValue?: () => ObjectFieldValue;
    nullable?: boolean;
    items: {
        [K in string]: FormField;
    };
};

export type FormField = PrimitiveField | ArrayField | ObjectField;
