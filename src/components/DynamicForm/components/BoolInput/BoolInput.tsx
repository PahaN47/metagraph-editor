import {
    ChangeEventHandler,
    FocusEventHandler,
    forwardRef,
    useContext,
    useMemo,
} from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../Input";
import { BoolFieldSchema, ValidationErrors } from "../../types";
import { SchemaFormParamsContext } from "../../context";

export type BoolInputProps = {
    className?: string;
    id?: string;
    name?: string;
    checked?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    onParams?: () => void;
    onRemove?: () => void;
    error?: string;
    nullable?: boolean;
};

export type BoolInputFieldProps = {
    fieldSchema: BoolFieldSchema;
    name: string;
    onRemove?: () => void;
};

export const BoolInput = forwardRef<HTMLInputElement, BoolInputProps>(
    (
        {
            className,
            id,
            name,
            checked,
            onChange,
            onBlur,
            onParams,
            onRemove,
            error,
        },
        ref
    ) => {
        return (
            <Input
                className={className}
                id={id}
                fieldType="bool"
                checked={checked}
                onChange={onChange}
                onBlur={onBlur}
                onParams={onParams}
                onRemove={onRemove}
                name={name}
                error={error}
                ref={ref}
            />
        );
    }
);

export const BoolInputField = ({
    fieldSchema,
    name,
    onRemove,
}: BoolInputFieldProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    const makeHandleParams = useContext(SchemaFormParamsContext);
    const onParams = useMemo(
        () => makeHandleParams?.(fieldSchema, name),
        [makeHandleParams, name, fieldSchema]
    );

    return (
        <BoolInput
            {...register(name)}
            error={(errors as ValidationErrors)[name]?.message}
            onParams={onParams}
            onRemove={onRemove}
            nullable={fieldSchema.nullable}
        />
    );
};
