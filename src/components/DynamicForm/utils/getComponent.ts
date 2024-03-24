import { ArrayInputField } from "../components/ArrayInput";
import { BoolInputField } from "../components/BoolInput";
import { DateInputField } from "../components/DateInput";
import { NumberInputField } from "../components/NumberInput";
import { ObjectInputField } from "../components/ObjectInput";
import { StringInputField } from "../components/StringInput";
import { FieldSchema } from "../types";

export const getComponent = (type: FieldSchema["type"]) => {
    switch (type) {
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
};
