import { ObjectFieldSchema } from "../../types";

export const INT_FORM_FIELD_SCHEMA: ObjectFieldSchema = {
    type: "object",
    items: {
        type: {
            type: "string",
            defaultValue: "int",
        },
        min: {
            type: "int",
            nullable: true,
        },
        max: {
            type: "int",
            nullable: true,
        },
        moreThan: {
            type: "int",
            nullable: true,
        },
        lessThan: {
            type: "int",
            nullable: true,
        },
        positive: {
            type: "bool",
            nullable: true,
        },
        negative: {
            type: "bool",
            nullable: true,
        },
        defaultValue: {
            type: "int",
            nullable: true,
        },
        nullable: {
            type: "bool",
            nullable: true,
        },
    },
};

export const FLOAT_FORM_FIELD_SCHEMA: ObjectFieldSchema = {
    type: "object",
    items: {
        type: {
            type: "string",
            defaultValue: "float",
        },
        min: {
            type: "float",
            nullable: true,
        },
        max: {
            type: "float",
            nullable: true,
        },
        moreThan: {
            type: "float",
            nullable: true,
        },
        lessThan: {
            type: "float",
            nullable: true,
        },
        positive: {
            type: "bool",
            nullable: true,
        },
        negative: {
            type: "bool",
            nullable: true,
        },
        defaultValue: {
            type: "float",
            nullable: true,
        },
        nullable: {
            type: "bool",
            nullable: true,
        },
    },
};

export const STRING_FORM_FIELD_SCHEMA: ObjectFieldSchema = {
    type: "object",
    items: {
        type: {
            type: "string",
            defaultValue: "string",
        },
        length: {
            type: "int",
            min: 0,
            nullable: true,
        },
        min: {
            type: "int",
            min: 0,
            nullable: true,
        },
        max: {
            type: "int",
            min: 0,
            nullable: true,
        },
        matches: {
            type: "string",
            nullable: true,
        },
        email: {
            type: "bool",
            nullable: true,
        },
        url: {
            type: "bool",
            nullable: true,
        },
        uuid: {
            type: "bool",
            nullable: true,
        },
        lowercase: {
            type: "bool",
            nullable: true,
        },
        uppercase: {
            type: "bool",
            nullable: true,
        },
        defaultValue: {
            type: "string",
            nullable: true,
        },
        nullable: {
            type: "bool",
            nullable: true,
        },
    },
};

export const BOOL_FORM_FIELD_SCHEMA: ObjectFieldSchema = {
    type: "object",
    items: {
        type: {
            type: "string",
            defaultValue: "bool",
        },
        defaultValue: {
            type: "bool",
            nullable: true,
        },
        nullable: {
            type: "bool",
            nullable: true,
        },
    },
};

export const DATE_FORM_FIELD_SCHEMA: ObjectFieldSchema = {
    type: "object",
    items: {
        type: {
            type: "string",
            defaultValue: "date",
        },
        min: {
            type: "date",
            nullable: true,
        },
        max: {
            type: "date",
            nullable: true,
        },
        defaultValue: {
            type: "date",
            nullable: true,
        },
        nullable: {
            type: "bool",
            nullable: true,
        },
    },
};

export const ARRAY_FORM_FIELD_SCHEMA: ObjectFieldSchema = {
    type: "object",
    items: {
        type: {
            type: "string",
            defaultValue: "array",
        },
        length: {
            type: "int",
            min: 0,
            nullable: true,
        },
        min: {
            type: "int",
            min: 0,
            nullable: true,
        },
        max: {
            type: "int",
            min: 0,
            nullable: true,
        },
        defaultValue: {
            type: "string",
            nullable: true,
        },
        nullable: {
            type: "bool",
            nullable: true,
        },
    },
};

export const OBJECT_FIELD_SCHEMA: ObjectFieldSchema = {
    type: "object",
    items: {
        type: {
            type: "string",
            defaultValue: "object",
        },
        defaultValue: {
            type: "string",
            nullable: true,
        },
        nullable: {
            type: "bool",
            nullable: true,
        },
    },
};
