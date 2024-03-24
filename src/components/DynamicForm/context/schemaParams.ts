import { createContext } from "react";
import { FieldSchema } from "../types";

export type SchemaFormParamsContextType =
    | ((initialSchema: FieldSchema, name?: string) => () => void)
    | undefined;

export const SchemaFormParamsContext =
    createContext<SchemaFormParamsContextType>(undefined);
