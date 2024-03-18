import { ObjectField } from "../../../../types";

export const INT_FORM_FIELD_SCHEMA: ObjectField = {
    type: "object",
    items: {
        type: {
            type: "string",
            defaultValue: "int",
        },
        min: {
            type: "int",
        },
        max: {
            type: "int",
        },
        moreThan: {
            type: "int",
        },
        lessThan: {
            type: "int",
        },
        positive: {
            type: "bool",
        },
        negative: {
            type: "bool",
        },
        defaultValue: {
            type: "int",
        },
        nullable: {
            type: "bool",
        },
    },
};

export const FLOAT_FORM_FIELD_SCHEMA: ObjectField = {
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

export const STRING_FORM_FIELD_SCHEMA: ObjectField = {
    type: "object",
    items: {
        type: {
            type: "string",
            defaultValue: "string",
        },
        length: {
            type: "int",
            min: 0,
        },
        min: {
            type: "int",
            min: 0,
        },
        max: {
            type: "int",
            min: 0,
        },
        matches: {
            type: "string",
        },
        email: {
            type: "bool",
        },
        url: {
            type: "bool",
        },
        uuid: {
            type: "bool",
        },
        lowercase: {
            type: "bool",
        },
        uppercase: {
            type: "bool",
        },
        defaultValue: {
            type: "string",
        },
        nullable: {
            type: "bool",
        },
    },
};

export const BOOL_FORM_FIELD_SCHEMA: ObjectField = {
    type: "object",
    items: {
        type: {
            type: "string",
            defaultValue: "bool",
        },
        defaultValue: {
            type: "bool",
        },
        nullable: {
            type: "bool",
        },
    },
};

export const DATE_FORM_FIELD_SCHEMA: ObjectField = {
    type: "object",
    items: {
        type: {
            type: "string",
            defaultValue: "date",
        },
        min: {
            type: "date",
        },
        max: {
            type: "date",
        },
        defaultValue: {
            type: "date",
        },
        nullable: {
            type: "bool",
        },
    },
};

export const ARRAY_FORM_FIELD_SCHEMA: ObjectField = {
    type: "object",
    items: {
        type: {
            type: "string",
            defaultValue: "array",
        },
        length: {
            type: "int",
            min: 0,
        },
        min: {
            type: "int",
            min: 0,
        },
        max: {
            type: "int",
            min: 0,
        },
        defaultValue: {
            type: "string",
        },
        nullable: {
            type: "bool",
        },
    },
};

export const OBJECT_FIELD_SCHEMA: ObjectField = {
    type: "object",
    items: {
        type: {
            type: "string",
            defaultValue: "object",
        },
        defaultValue: {
            type: "string",
        },
        nullable: {
            type: "bool",
        },
    },
};
