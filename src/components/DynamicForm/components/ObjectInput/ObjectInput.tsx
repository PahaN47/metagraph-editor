import { getFieldsFromSchema } from "../../utils";
import { useContext, useMemo } from "react";
import { InputContainer } from "../InputContainer";
import { ObjectFieldSchema, ValidationErrors } from "../../types";
import { SchemaFormParamsContext } from "../../context";
import { useFormContext } from "react-hook-form";

export type ObjectInputFieldProps = {
    className?: string;
    fieldSchema: ObjectFieldSchema;
    name: string;
    onRemove?: () => void;
};

export const ObjectInputField = ({
    className,
    fieldSchema,
    name,
    onRemove,
}: ObjectInputFieldProps) => {
    const {
        formState: { errors },
    } = useFormContext();
    const children = useMemo(
        () => getFieldsFromSchema(fieldSchema, name),
        [name, fieldSchema]
    );

    const makeHandleParams = useContext(SchemaFormParamsContext);
    const onParams = useMemo(
        () => makeHandleParams?.(fieldSchema, name),
        [makeHandleParams, name, fieldSchema]
    );

    return (
        <InputContainer
            className={className}
            name={name}
            onParams={onParams}
            onRemove={onRemove}
            error={(errors as ValidationErrors)[name]?.message}
        >
            {children}
        </InputContainer>
    );
};
