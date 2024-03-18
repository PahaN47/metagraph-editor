import { useCallback } from "react";
import { Flags, Schema, ValidationError } from "yup";
import { FormValues, parseFormValues } from ".";

export const useYupValidationResolver = (
    validationSchema: Schema<FormValues, unknown, unknown, Flags>
) =>
    useCallback(
        async (data: FormValues) => {
            try {
                const values = await validationSchema.validate(
                    parseFormValues(data),
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
                console.log(result);
                return result;
            }
        },
        [validationSchema]
    );
