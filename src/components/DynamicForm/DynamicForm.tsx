import { useCallback, useMemo, useReducer, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import cn from "./styles.module.scss";
import { getFieldDefaultValue, getFieldsFromSchema } from "./utils";
import { FormField, ObjectField } from "../../types";
import { InputContainer } from "./components/InputContainer";
import {
    DispatchSchemaContext,
    SchemaFormParamsContext,
    schemaReducer,
} from "./context";
import { AboveLayout } from "../AboveLayout/AboveLayout";
import { SchemaForm } from "./components/SchemaForm";

const initialSchema: ObjectField = {
    type: "object",
    items: {
        age: {
            type: "int",
            value: 18,
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
            value: () => new Date(),
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
            value: () => [new Date(), new Date(), new Date()],
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
            value: () => [{ one: 1, three: new Date() }, { one: 2 }],
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
    const values = useMemo(() => getFieldDefaultValue(initialSchema), []);
    const [schema, dispatchSchema] = useReducer(schemaReducer, initialSchema);
    const [schemaFormName, setSchemaFormName] = useState<string | undefined>();
    const [schemaFormParams, setSchemaFormParams] = useState<
        FormField | undefined
    >();

    const { handleSubmit, register, ...formContext } = useForm({
        defaultValues: values as object,
    });

    const onSubmit = useCallback(
        (data: unknown) => console.log("SUBMIT", data),
        []
    );

    const children = useMemo(() => getFieldsFromSchema(schema), [schema]);

    const makeHandleSchemaFormParams = useCallback(
        (initialSchema: FormField, name?: string) => () => {
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
        (newSchema: FormField) => {
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
                    initialSchema={schemaFormParams as FormField}
                    name={schemaFormName}
                    onSubmit={handleSchemaFormSubmit}
                    onClose={handleSchemaFormClose}
                />
            </AboveLayout>
        </>
    );
};
