import {
    ChangeEventHandler,
    FocusEventHandler,
    forwardRef,
    useContext,
    useMemo,
} from "react";
import { FloatField, IntField } from "../../../../types";
import { useFormContext } from "react-hook-form";
import { Input } from "../Input";
import { getNumberInputLimits } from "./utils";
import { SchemaFormParamsContext } from "../..";

export type NumberInputProps = {
    className?: string;
    isInt?: boolean;
    name?: string;
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    onParams?: () => void;
    onRemove?: () => void;
    error?: string;
    min?: number;
    max?: number;
    lessThan?: number;
    moreThan?: number;
    positive?: boolean;
    negative?: boolean;
    nullable?: boolean;
};

export type NumberInputFieldProps = {
    schemaField: IntField | FloatField;
    name: string;
    onRemove?: () => void;
};

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
    (
        {
            className,
            isInt,
            name,
            value,
            onChange,
            onBlur,
            onParams,
            onRemove,
            error,
            min,
            max,
            lessThan,
            moreThan,
        },
        ref
    ) => {
        const placeholder = getNumberInputLimits({
            min,
            max,
            lessThan,
            moreThan,
        });

        return (
            <Input
                className={className}
                fieldType={isInt ? "int" : "float"}
                placeholder={placeholder}
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

export const NumberInputField = ({
    schemaField,
    name,
    onRemove,
}: NumberInputFieldProps) => {
    const { register } = useFormContext();
    const makeHandleParams = useContext(SchemaFormParamsContext);
    const onParams = useMemo(
        () => makeHandleParams?.(schemaField, name),
        [makeHandleParams, name, schemaField]
    );
    const isInt = schemaField.type === "int";

    return (
        <NumberInput
            {...register(name)}
            isInt={isInt}
            // error={fieldState.error?.message}
            onParams={onParams}
            onRemove={onRemove}
            min={schemaField.min}
            max={schemaField.max}
            lessThan={schemaField.lessThan}
            moreThan={schemaField.moreThan}
            positive={schemaField.positive}
            negative={schemaField.negative}
            nullable={schemaField.nullable}
        />
    );
};
