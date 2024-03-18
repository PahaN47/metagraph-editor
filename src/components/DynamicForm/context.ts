import { Dispatch, createContext } from "react";
import { ArrayField, FormField, ObjectField } from "../../types";
import { IN_ARRAY_FIELD_VALUE } from "./const";
import cloneDeep from "lodash.clonedeep";

export type SchemaState = ObjectField;

export type SchemaAction = { name: string } & (
    | {
          type: "add";
          schema: FormField;
      }
    | { type: "remove" }
    | { type: "change"; schema: Partial<FormField> }
);

export type DispatchSchemaContextType = Dispatch<SchemaAction>;
export type SchemaFormParamsContextType =
    | ((initialSchema: FormField, name?: string) => () => void)
    | undefined;

export const DispatchSchemaContext = createContext<DispatchSchemaContextType>(
    () => undefined
);

export const SchemaFormParamsContext =
    createContext<SchemaFormParamsContextType>(undefined);

export const extractSchemaField = (
    schema: ObjectField | ArrayField,
    name: string
): FormField => {
    const splitName = name.split(".");
    const currentFieldName = splitName[0];

    if (schema.type === "object") {
        const currentField = schema.items[currentFieldName];

        if (splitName.length <= 1) {
            return currentField;
        }

        return extractSchemaField(
            currentField as ObjectField | ArrayField,
            splitName.slice(1).join(".")
        );
    }

    const currentFieldValueName = splitName[1];

    if (
        Number.isNaN(+currentFieldName) ||
        currentFieldValueName !== IN_ARRAY_FIELD_VALUE
    ) {
        throw new Error(
            `Array mismatch between current schema and form fields!\nschema: ${JSON.stringify(
                schema,
                undefined,
                4
            )}\nname: ${name}`
        );
    }

    const currentField = schema.items;

    if (splitName.length <= 2) {
        return currentField;
    }

    return extractSchemaField(
        currentField as ObjectField | ArrayField,
        splitName.slice(2).join(".")
    );
};

const addFieldToSchema = (
    state: SchemaState,
    name: string,
    field: FormField
) => {
    const newState = cloneDeep(state);
    const splitName = name.split(".");
    const currentName = splitName[splitName.length - 1];
    const parentName = splitName.slice(0, splitName.length - 1).join(".");

    const parentSchema = parentName
        ? extractSchemaField(newState, parentName)
        : newState;

    if (parentSchema.type !== "object") {
        throw new Error(`Structure error while adding ${name}`);
    }
    parentSchema.items[currentName] = field;

    return newState;
};

const removeFieldFromSchema = (state: SchemaState, name: string) => {
    const newState = cloneDeep(state);
    const splitName = name.split(".");
    const currentName = splitName[splitName.length - 1];
    const parentName = splitName.slice(0, splitName.length - 1).join(".");

    const parentSchema = parentName
        ? extractSchemaField(newState, parentName)
        : newState;

    if (parentSchema.type !== "object") {
        throw new Error(`Structure error while removing ${name}`);
    }

    delete parentSchema.items[currentName];

    return newState;
};

const changeFieldInSchema = (
    state: SchemaState,
    name: string,
    field: Partial<FormField>
) => {
    const newState = cloneDeep(state);
    const splitName = name.split(".");
    const currentName = splitName[splitName.length - 1];

    const parentName = splitName
        .slice(
            0,
            splitName.length - (currentName === IN_ARRAY_FIELD_VALUE ? 2 : 1)
        )
        .join(".");

    const parentSchema = parentName
        ? extractSchemaField(newState, parentName)
        : newState;

    if (parentSchema.type === "array") {
        parentSchema.items = { ...parentSchema.items, ...field } as FormField;

        return newState;
    }
    if (parentSchema.type === "object") {
        parentSchema.items[currentName] = {
            ...parentSchema.items[currentName],
            ...field,
        } as FormField;

        return newState;
    }

    throw new Error(`Structure error while changing ${name}`);
};

export const schemaReducer = (state: SchemaState, action: SchemaAction) => {
    switch (action.type) {
        case "add":
            return addFieldToSchema(state, action.name, action.schema);
        case "remove":
            return removeFieldFromSchema(state, action.name);
        case "change":
        default:
            return changeFieldInSchema(state, action.name, action.schema);
    }
};
