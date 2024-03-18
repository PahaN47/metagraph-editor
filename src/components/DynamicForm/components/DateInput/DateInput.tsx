import {
    ChangeEventHandler,
    FocusEventHandler,
    forwardRef,
    useContext,
    useMemo,
} from "react";
import { DateField } from "../../../../types";
import { useFormContext } from "react-hook-form";
import { Input } from "../Input";
import { SchemaFormParamsContext } from "../..";

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
    schemaField: DateField;
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
    schemaField,
    name,
    onRemove,
}: DateInputFieldProps) => {
    const { register } = useFormContext();
    const makeHandleParams = useContext(SchemaFormParamsContext);
    const onParams = useMemo(
        () => makeHandleParams?.(schemaField, name),
        [makeHandleParams, name, schemaField]
    );

    return (
        <DateInput
            {...register(name)}
            // error={fieldState.error?.message}
            onParams={onParams}
            onRemove={onRemove}
            minDate={schemaField.min}
            maxDate={schemaField.max}
            nullable={schemaField.nullable}
        />
    );
};
