import {
    UseFieldArrayRemove,
    useFieldArray,
    useFormContext,
} from "react-hook-form";
import { useCallback, useContext, useMemo } from "react";
import { InputContainer } from "../InputContainer";
import { getComponent } from "../../utils/getComponent";
import { ArrayFieldSchema, ValidationErrors } from "../../types";
import { IN_ARRAY_FIELD_VALUE } from "../../const";
import { schemaToFieldValue } from "../../utils";
import { SchemaFormParamsContext } from "../../context";

export type ArrayInputFieldProps = {
    className?: string;
    fieldSchema: ArrayFieldSchema;
    name: string;
    onRemove?: () => void;
};

const makeHandleRemove = (remove: UseFieldArrayRemove, index: number) => () =>
    remove(index);

export const ArrayInputField = ({
    className,
    fieldSchema,
    name,
    onRemove,
}: ArrayInputFieldProps) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });
    const items = useMemo(() => fieldSchema.items, [fieldSchema.items]);
    const handleAppend = useCallback(
        () => append({ [IN_ARRAY_FIELD_VALUE]: schemaToFieldValue(items) }),
        [append, items]
    );

    const makeHandleParams = useContext(SchemaFormParamsContext);
    const onParams = useMemo(
        () => makeHandleParams?.(fieldSchema, name),
        [makeHandleParams, name, fieldSchema]
    );

    const ChildInput = useMemo(() => getComponent(items.type), [items.type]);

    return (
        <InputContainer
            className={className}
            name={name}
            onAppend={handleAppend}
            onParams={onParams}
            onRemove={onRemove}
            error={(errors as ValidationErrors)[name]?.message}
        >
            {fields.map((field, index) => (
                <ChildInput
                    key={field.id}
                    fieldSchema={items as never}
                    name={`${name}.${index}.${IN_ARRAY_FIELD_VALUE}`}
                    onRemove={makeHandleRemove(remove, index)}
                />
            ))}
        </InputContainer>
    );
};
