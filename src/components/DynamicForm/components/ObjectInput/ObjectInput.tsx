import { getFieldsFromSchema } from "../../utils";
import { ObjectField } from "../../../../types";
import { useContext, useMemo } from "react";
import { InputContainer } from "../InputContainer";
import { SchemaFormParamsContext } from "../..";

export type ObjectInputFieldProps = {
    className?: string;
    schemaField: ObjectField;
    name: string;
    onRemove?: () => void;
};

export const ObjectInputField = ({
    className,
    schemaField,
    name,
    onRemove,
}: ObjectInputFieldProps) => {
    const children = useMemo(
        () => getFieldsFromSchema(schemaField, name),
        [name, schemaField]
    );

    const makeHandleParams = useContext(SchemaFormParamsContext);
    const onParams = useMemo(
        () => makeHandleParams?.(schemaField, name),
        [makeHandleParams, name, schemaField]
    );

    return (
        <InputContainer
            className={className}
            name={name}
            onParams={onParams}
            onRemove={onRemove}
        >
            {children}
        </InputContainer>
    );
};
