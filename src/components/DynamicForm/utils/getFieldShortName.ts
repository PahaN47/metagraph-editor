import { IN_ARRAY_FIELD_VALUE_REGEX } from "../const";

export const getFieldShortName = (name?: string) => {
    const arrayIndexStart = name?.match(IN_ARRAY_FIELD_VALUE_REGEX)?.index;
    const arrayIndexStartSlice =
        arrayIndexStart != null ? name?.slice(arrayIndexStart) : undefined;

    return arrayIndexStart != null
        ? `[${arrayIndexStartSlice?.slice(
              arrayIndexStartSlice.indexOf(".") + 1,
              arrayIndexStartSlice.lastIndexOf(".")
          )}]`
        : name?.slice(name.lastIndexOf(".") + 1);
};
