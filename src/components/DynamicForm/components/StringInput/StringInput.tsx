import {
    ChangeEventHandler,
    FocusEventHandler,
    forwardRef,
    useContext,
    useMemo,
} from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../Input";
import { StringFieldSchema, ValidationErrors } from "../../types";
import { SchemaFormParamsContext } from "../../context";

export type StringInputProps = {
    className?: string;
    name?: string;
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    onParams?: () => void;
    onRemove?: () => void;
    error?: string;
    minLength?: number;
    maxLength?: number;
    lowercase?: boolean;
    uppercase?: boolean;
    nullable?: boolean;
    inArray?: boolean;
};

export type StringInputFieldProps = {
    fieldSchema: StringFieldSchema;
    name: string;
    onRemove?: () => void;
};

export const StringInput = forwardRef<HTMLInputElement, StringInputProps>(
    (
        { className, name, value, onChange, onBlur, onParams, onRemove, error },
        ref
    ) => {
        return (
            <Input
                className={className}
                fieldType="string"
                placeholder="..."
                value={value}
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

export const StringInputField = ({
    fieldSchema,
    name,
    onRemove,
}: StringInputFieldProps) => {
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
        <StringInput
            {...register(name)}
            error={(errors as ValidationErrors)[name]?.message}
            onRemove={onRemove}
            onParams={onParams}
            minLength={fieldSchema.min}
            maxLength={fieldSchema.max}
            lowercase={fieldSchema.lowercase}
            uppercase={fieldSchema.uppercase}
            nullable={fieldSchema.nullable}
        />
    );
};
