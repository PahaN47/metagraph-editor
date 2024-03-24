import { useCallback } from "react";
import { Flags, Schema, ValidationError } from "yup";
import { FieldSchema, FieldValue, ParsedFieldValue } from "../types";
import { parseFieldValue, parseValidationErrors } from "../utils";

export const useYupValidationResolver = (
    fieldSchema: FieldSchema,
    validationSchema: Schema<ParsedFieldValue, unknown, unknown, Flags>
) =>
    useCallback(
        async (data: FieldValue) => {
            try {
                console.log({
                    data,
                    parsed: parseFieldValue(data, fieldSchema),
                });
                const values = await validationSchema.validate(
                    parseFieldValue(data, fieldSchema),
                    {
                        abortEarly: false,
                    }
                );

                return {
                    values,
                    errors: {},
                };
            } catch (errors) {
                const result = {
                    values: {},
                    errors: (errors as ValidationError).inner.reduce(
                        (allErrors, currentError) => ({
                            ...allErrors,
                            [currentError.path as string]: {
                                type: currentError.type ?? "validation",
                                message: currentError.message,
                            },
                        }),
                        {}
                    ),
                };

                result.errors = parseValidationErrors(result.errors);
                console.log(result);
                return result;
            }
        },
        [fieldSchema, validationSchema]
    );
