import {
    ChangeEventHandler,
    FocusEventHandler,
    forwardRef,
    useContext,
    useMemo,
} from "react";
import { StringField } from "../../../../types";
import { useFormContext } from "react-hook-form";
import { Input } from "../Input";
import { SchemaFormParamsContext } from "../..";

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
    schemaField: StringField;
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
    schemaField,
    name,
    onRemove,
}: StringInputFieldProps) => {
    const { register } = useFormContext();
    const makeHandleParams = useContext(SchemaFormParamsContext);
    const onParams = useMemo(
        () => makeHandleParams?.(schemaField, name),
        [makeHandleParams, name, schemaField]
    );

    return (
        <StringInput
            {...register(name)}
            // error={fieldState.error?.message}
            onRemove={onRemove}
            onParams={onParams}
            minLength={schemaField.min}
            maxLength={schemaField.max}
            lowercase={schemaField.lowercase}
            uppercase={schemaField.uppercase}
            nullable={schemaField.nullable}
        />
    );
};
