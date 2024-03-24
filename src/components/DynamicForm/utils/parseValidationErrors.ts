import { IN_ARRAY_FIELD_VALUE } from "../const";
import { ValidationErrors } from "../types";

export const parseValidationErrors = (errors: object): ValidationErrors => {
    return Object.fromEntries(
        Object.entries(errors).map(([key, value]) => [
            key
                .replace(/\["?/g, ".")
                .replace(/"?\]/g, `.${IN_ARRAY_FIELD_VALUE}`),
            value,
        ])
    );
};
