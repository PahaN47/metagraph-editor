import {
    ChangeEventHandler,
    FocusEventHandler,
    forwardRef,
    useContext,
    useMemo,
} from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../Input";
import { getNumberInputLimits } from "./utils";
import {
    FloatFieldSchema,
    IntFieldSchema,
    ValidationErrors,
} from "../../types";
import { SchemaFormParamsContext } from "../../context";

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
    fieldSchema: IntFieldSchema | FloatFieldSchema;
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
    fieldSchema,
    name,
    onRemove,
}: NumberInputFieldProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    const makeHandleParams = useContext(SchemaFormParamsContext);
    const onParams = useMemo(
        () => makeHandleParams?.(fieldSchema, name),
        [makeHandleParams, name, fieldSchema]
    );
    const isInt = fieldSchema.type === "int";

    return (
        <NumberInput
            {...register(name)}
            isInt={isInt}
            error={(errors as ValidationErrors)[name]?.message}
            onParams={onParams}
            onRemove={onRemove}
            min={fieldSchema.min}
            max={fieldSchema.max}
            lessThan={fieldSchema.lessThan}
            moreThan={fieldSchema.moreThan}
            positive={fieldSchema.positive}
            negative={fieldSchema.negative}
            nullable={fieldSchema.nullable}
        />
    );
};
