import { ObjectFieldSchema } from "../types";
import { getComponent } from "./getComponent";

export const getFieldsFromSchema = (
    schema: ObjectFieldSchema,
    name?: string
) => {
    return Object.entries(schema.items).map(([key, item]) => {
        const fieldName = name ? `${name}.${key}` : key;
        const Component = getComponent(item.type);

        return (
            <Component
                key={fieldName}
                fieldSchema={item as never}
                name={fieldName}
            />
        );
    });
};
