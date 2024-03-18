import {
    ChangeEventHandler,
    FocusEventHandler,
    forwardRef,
    useContext,
    useMemo,
} from "react";
import { BoolField } from "../../../../types";
import { useFormContext } from "react-hook-form";
import { Input } from "../Input";
import { SchemaFormParamsContext } from "../..";

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
    schemaField: BoolField;
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
    schemaField,
    name,
    onRemove,
}: BoolInputFieldProps) => {
    const { register } = useFormContext();
    const makeHandleParams = useContext(SchemaFormParamsContext);
    const onParams = useMemo(
        () => makeHandleParams?.(schemaField, name),
        [makeHandleParams, name, schemaField]
    );

    return (
        <BoolInput
            {...register(name)}
            // error={fieldState.error?.message}
            onParams={onParams}
            onRemove={onRemove}
            nullable={schemaField.nullable}
        />
    );
};
