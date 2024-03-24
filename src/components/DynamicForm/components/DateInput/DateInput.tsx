import {
    ChangeEventHandler,
    FocusEventHandler,
    forwardRef,
    useContext,
    useMemo,
} from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../Input";
import { DateFieldSchema, ValidationErrors } from "../../types";
import { SchemaFormParamsContext } from "../../context";

export type DateInputProps = {
    className?: string;
    name?: string;
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    onParams?: () => void;
    onRemove?: () => void;
    error?: string;
    minDate?: Date;
    maxDate?: Date;
    nullable?: boolean;
};

export type DateInputFieldProps = {
    fieldSchema: DateFieldSchema;
    name: string;
    onRemove?: () => void;
};

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
    (
        { className, name, value, onChange, onBlur, onParams, onRemove, error },
        ref
    ) => {
        return (
            <Input
                className={className}
                fieldType="date"
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

export const DateInputField = ({
    fieldSchema,
    name,
    onRemove,
}: DateInputFieldProps) => {
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
        <DateInput
            {...register(name)}
            error={(errors as ValidationErrors)[name]?.message}
            onParams={onParams}
            onRemove={onRemove}
            minDate={fieldSchema.min}
            maxDate={fieldSchema.max}
            nullable={fieldSchema.nullable}
        />
    );
};
