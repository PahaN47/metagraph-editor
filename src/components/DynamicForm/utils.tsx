import { FieldValue, FormField, ObjectField } from "../../types";
import { NumberInputField } from "./components/NumberInput";
import { StringInputField } from "./components/StringInput";
import { BoolInputField } from "./components/BoolInput";
import { DateInputField } from "./components/DateInput";
import { ArrayInputField } from "./components/ArrayInput";
import { ObjectInputField } from "./components/ObjectInput";
import {
    DATE_INPUT_FORMAT,
    IN_ARRAY_FIELD_VALUE,
    IN_ARRAY_FIELD_VALUE_REGEX,
} from ".";
import { format } from "date-fns";

export const getFieldShortName = (name?: string) => {
    const arrayIndexStart = name?.match(IN_ARRAY_FIELD_VALUE_REGEX)?.index;
    const arrayIndexStartSlice =
        arrayIndexStart != null ? name?.slice(arrayIndexStart) : undefined;

    return arrayIndexStart != null
        ? `[${arrayIndexStartSlice?.slice(
              arrayIndexStartSlice.indexOf(".") + 1,
              arrayIndexStartSlice.lastIndexOf(".")
          )}]`
        : name?.slice(name.lastIndexOf(".") + 1);
};

export const getFieldsFromSchema = (schema: ObjectField, name?: string) => {
    const result = Object.entries(schema.items).map(([key, item]) => {
        const fieldName = name ? `${name}.${key}` : key;
        switch (item.type) {
            case "int":
            case "float":
                return (
                    <NumberInputField
                        key={fieldName}
                        schemaField={item}
                        name={fieldName}
                    />
                );
            case "string":
                return (
                    <StringInputField
                        key={fieldName}
                        schemaField={item}
                        name={fieldName}
                    />
                );
            case "bool":
                return (
                    <BoolInputField
                        key={fieldName}
                        schemaField={item}
                        name={fieldName}
                    />
                );
            case "date":
                return (
                    <DateInputField
                        key={fieldName}
                        schemaField={item}
                        name={fieldName}
                    />
                );
            case "array":
                return (
                    <ArrayInputField
                        key={fieldName}
                        schemaField={item}
                        name={fieldName}
                    />
                );
            case "object":
            default:
                return (
                    <ObjectInputField
                        key={fieldName}
                        schemaField={item}
                        name={fieldName}
                    />
                );
        }
    });
    return result;
};

type FormValue =
    | FormField["defaultValue"]
    | FieldValue
    | FormValue[]
    | { [K: string]: FormValue };

export type FormValues =
    | number
    | boolean
    | string
    | { [IN_ARRAY_FIELD_VALUE]: FormValues }[]
    | { [K: string]: FormValues }
    | undefined
    | null;

type ParsedFormValues =
    | number
    | boolean
    | string
    | undefined
    | null
    | ParsedFormValues[]
    | { [K: string]: ParsedFormValues };

const formatDateForInput = (date: Date | string | undefined) =>
    date ? format(date, DATE_INPUT_FORMAT) : "";

export const parseSchemaFieldValue = (v: FormValue): FormValues => {
    const value = typeof v === "function" ? v() : v;

    if (!(typeof value === "object")) {
        return value;
    }

    if (value instanceof Date) {
        return formatDateForInput(value);
    }

    if (Array.isArray(value)) {
        return value.map((childValue) => ({
            [IN_ARRAY_FIELD_VALUE]: parseSchemaFieldValue(childValue),
        }));
    }

    return Object.fromEntries(
        Object.entries(value).map(([key, childValue]) => [
            key,
            parseSchemaFieldValue(childValue),
        ])
    );
};

export const extractDefaultValues = (schema: FormField): FormValue => {
    let fieldValue: FormValue;
    switch (schema.type) {
        case "int":
        case "float":
            fieldValue =
                schema.value ??
                schema.defaultValue ??
                schema.min ??
                (schema.max != null ? (schema.max > 0 ? 0 : schema.max) : 0);
            break;
        case "string":
            fieldValue = schema.value ?? schema.defaultValue ?? "";
            break;
        case "bool":
            fieldValue = schema.value ?? schema.defaultValue ?? false;
            break;
        case "date":
            fieldValue = schema.value ?? schema.defaultValue;
            break;
        case "array":
            fieldValue =
                schema.value ??
                schema.defaultValue ??
                new Array(schema.length ?? schema.min ?? 0)
                    .fill(0)
                    .map(() => extractDefaultValues(schema.items));
            break;
        case "object":
        default:
            fieldValue =
                schema.value ??
                schema.defaultValue ??
                Object.fromEntries(
                    Object.entries(schema.items).map(([key, childSchema]) => [
                        key,
                        extractDefaultValues(childSchema),
                    ])
                );
    }

    return fieldValue;
};

export const getFieldDefaultValue = (schema: FormField): FormValues => {
    const fieldValue = extractDefaultValues(schema);

    return parseSchemaFieldValue(fieldValue);
};

export const parseFormValues = <T extends FormValues>(
    data: T
): ParsedFormValues => {
    if (!data || typeof data !== "object") {
        return data;
    }
    if (Array.isArray(data)) {
        return data.map(({ [IN_ARRAY_FIELD_VALUE]: value }) =>
            parseFormValues(value)
        );
    }

    return Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
            key,
            parseFormValues(value),
        ])
    );
};
