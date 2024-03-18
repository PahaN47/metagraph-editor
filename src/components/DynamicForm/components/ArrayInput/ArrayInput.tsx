import { ArrayField } from "../../../../types";
import {
    UseFieldArrayRemove,
    useFieldArray,
    useFormContext,
} from "react-hook-form";
import { useCallback, useContext, useMemo } from "react";
import { NumberInputField } from "../NumberInput";
import { StringInputField } from "../StringInput";
import { BoolInputField } from "../BoolInput";
import { DateInputField } from "../DateInput";
import { ObjectInputField } from "../ObjectInput";
import { InputContainer } from "../InputContainer";
import {
    IN_ARRAY_FIELD_VALUE,
    SchemaFormParamsContext,
    getFieldDefaultValue,
} from "../..";

export type ArrayInputFieldProps = {
    className?: string;
    schemaField: ArrayField;
    name: string;
    onRemove?: () => void;
};

const makeHandleRemove = (remove: UseFieldArrayRemove, index: number) => () =>
    remove(index);

export const ArrayInputField = ({
    className,
    schemaField,
    name,
    onRemove,
}: ArrayInputFieldProps) => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });
    const items = useMemo(() => schemaField.items, [schemaField.items]);
    const handleAppend = useCallback(
        () => append({ [IN_ARRAY_FIELD_VALUE]: getFieldDefaultValue(items) }),
        [append, items]
    );

    const makeHandleParams = useContext(SchemaFormParamsContext);
    const onParams = useMemo(
        () => makeHandleParams?.(schemaField, name),
        [makeHandleParams, name, schemaField]
    );

    const ChildInput = useMemo(() => {
        switch (items.type) {
            case "int":
            case "float":
                return NumberInputField;
            case "string":
                return StringInputField;
            case "bool":
                return BoolInputField;
            case "date":
                return DateInputField;
            case "array":
                return ArrayInputField;
            case "object":
            default:
                return ObjectInputField;
        }
    }, [items.type]);

    return (
        <InputContainer
            className={className}
            name={name}
            onAppend={handleAppend}
            onParams={onParams}
            onRemove={onRemove}
        >
            {fields.map((field, index) => (
                <ChildInput
                    key={field.id}
                    schemaField={items as never}
                    name={`${name}.${index}.${IN_ARRAY_FIELD_VALUE}`}
                    onRemove={makeHandleRemove(remove, index)}
                />
            ))}
        </InputContainer>
    );
};
