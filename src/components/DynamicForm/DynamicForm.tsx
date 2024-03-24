import { useCallback, useMemo, useReducer, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import cn from "./styles.module.scss";
import {
    getFieldsFromSchema,
    getValidationSchema,
    schemaToFieldValue,
} from "./utils";
import { InputContainer } from "./components/InputContainer";
import {
    DispatchSchemaContext,
    SchemaFormParamsContext,
    schemaReducer,
} from "./context";
import { AboveLayout } from "../AboveLayout/AboveLayout";
import { SchemaForm } from "./components/SchemaForm";
import { FieldSchema, ObjectFieldSchema } from "./types";
import { useYupValidationResolver } from "./hooks";
import { Schema } from "yup";

const initialSchema: ObjectFieldSchema = {
    type: "object",
    items: {
        age: {
            type: "int",
            value: 18,
            min: 10,
        },
        salary: {
            type: "float",
            defaultValue: 100000.12,
            min: 10000,
        },
        name: {
            type: "string",
            value: "Name",
        },
        isMale: {
            type: "bool",
            value: false,
        },
        startDate: {
            type: "date",
            value: "2024-02-29",
        },
        basicElements: {
            type: "array",
            min: 3,
            items: {
                type: "bool",
                value: true,
            },
        },
        friends: {
            type: "array",
            value: () => [-1, -2, -3, -4],
            items: {
                type: "int",
                negative: true,
            },
        },
        doubleArray: {
            type: "array",
            value: () => [
                ["Eveline", "Mister God"],
                ["Your Tormentor", "Basic Loser"],
            ],
            items: {
                type: "array",
                items: {
                    type: "string",
                },
            },
        },
        dateArray: {
            type: "array",
            value: () => ["2024-03-24", "2024-03-25", "2024-03-26"],
            items: {
                type: "date",
            },
        },
        object: {
            type: "object",
            items: {
                first: {
                    type: "int",
                    value: 147,
                },
                second: {
                    type: "date",
                },
                third: {
                    type: "array",
                    min: 5,
                    items: {
                        type: "string",
                    },
                },
            },
        },
        nestedObject: {
            type: "object",
            items: {
                nextObject: {
                    type: "object",
                    items: {
                        lastObject: {
                            type: "array",
                            min: 2,
                            items: {
                                type: "bool",
                                value: true,
                            },
                        },
                    },
                },
                aha: {
                    type: "date",
                },
            },
        },
        faultyTest: {
            type: "object",
            items: {
                falseBool: {
                    type: "bool",
                },
                falseNumber: {
                    type: "float",
                },
                falseString: {
                    type: "string",
                },
            },
        },
        objectArray: {
            type: "array",
            value: () => [{ one: 1, three: "2002-05-27" }, { one: 2 }],
            items: {
                type: "object",
                items: {
                    one: {
                        type: "int",
                    },
                    two: {
                        type: "bool",
                    },
                    three: {
                        type: "date",
                    },
                },
            },
        },
    },
};

export const DynamicForm = () => {
    const values = useMemo(() => schemaToFieldValue(initialSchema), []);
    const [schema, dispatchSchema] = useReducer(schemaReducer, initialSchema);
    const [schemaFormName, setSchemaFormName] = useState<string | undefined>();
    const [schemaFormParams, setSchemaFormParams] = useState<
        FieldSchema | undefined
    >();

    const validationSchema = useMemo(
        () => getValidationSchema(schema),
        [schema]
    );

    const validationResolver = useYupValidationResolver(
        schema,
        validationSchema as Schema
    );

    const { handleSubmit, register, ...formContext } = useForm({
        defaultValues: values as object,
        resolver: validationResolver,
    });

    const onSubmit = useCallback(
        (data: unknown) => console.log("SUBMIT", data),
        []
    );

    const children = useMemo(() => getFieldsFromSchema(schema), [schema]);

    const makeHandleSchemaFormParams = useCallback(
        (initialSchema: FieldSchema, name?: string) => () => {
            setSchemaFormParams(initialSchema);
            setSchemaFormName(name);
        },
        []
    );

    const handleSchemaFormClose = useCallback(() => {
        setSchemaFormParams(undefined);
        setSchemaFormName(undefined);
    }, []);

    const handleSchemaFormSubmit = useCallback(
        (newSchema: FieldSchema) => {
            console.log(newSchema);
            dispatchSchema({
                type: "change",
                name: schemaFormName ?? "",
                schema: newSchema,
            });
            handleSchemaFormClose();
        },
        [handleSchemaFormClose, schemaFormName]
    );

    return (
        <>
            <DispatchSchemaContext.Provider value={dispatchSchema}>
                <SchemaFormParamsContext.Provider
                    value={makeHandleSchemaFormParams}
                >
                    <FormProvider
                        handleSubmit={handleSubmit}
                        register={register}
                        {...formContext}
                    >
                        <form
                            className={cn["form"]}
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <InputContainer>{children}</InputContainer>
                            <input type="submit" />
                        </form>
                    </FormProvider>
                </SchemaFormParamsContext.Provider>
            </DispatchSchemaContext.Provider>
            <AboveLayout visible={!!schemaFormParams}>
                <SchemaForm
                    initialSchema={schemaFormParams}
                    name={schemaFormName}
                    onSubmit={handleSchemaFormSubmit}
                    onClose={handleSchemaFormClose}
                />
            </AboveLayout>
        </>
    );
};
