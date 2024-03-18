import {
    ChangeEventHandler,
    FocusEventHandler,
    forwardRef,
    useId,
    useMemo,
} from "react";
import { PrimitiveField } from "../../../../types";
import classNames from "classnames";
import cn from "./styles.module.scss";
import { getFieldShortName } from "../../utils";
import {
    CalendarIcon,
    FractionIcon,
    IntegerIcon,
    ParamsIcon,
    TextIcon,
} from "../../../../assets/icons";
import { Button } from "../../../Button";

type InputProps = {
    className?: string;
    id?: string;
    fieldType: PrimitiveField["type"];
    value?: string;
    checked?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    onParams?: () => void;
    onRemove?: () => void;
    name?: string;
    placeholder?: string;
    error?: string;
    nullable?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            id,
            fieldType,
            value,
            checked,
            onChange,
            onBlur,
            onParams,
            onRemove,
            name,
            placeholder,
            error,
        },
        ref
    ) => {
        const shortName = getFieldShortName(name);
        const type =
            fieldType === "bool"
                ? "checkbox"
                : fieldType === "date"
                ? "date"
                : "text";
        const isBool = fieldType === "bool";
        const internalId = useId();

        const Icon = useMemo(() => {
            switch (fieldType) {
                case "int":
                    return IntegerIcon;
                case "float":
                    return FractionIcon;
                case "string":
                    return TextIcon;
                case "date":
                    return CalendarIcon;
            }
        }, [fieldType]);

        return (
            // <div className={classNames(className, cn["wrap"])}>
            <>
                <span className={cn["label"]}>{shortName}: </span>
                <div className={classNames(className, cn["wrap"])}>
                    <div className={cn["input-wrap"]} data-type={fieldType}>
                        <input
                            className={classNames(
                                cn["input"],
                                error && cn["with-error"]
                            )}
                            id={id ?? internalId}
                            type={type}
                            name={name}
                            placeholder={placeholder}
                            value={value}
                            checked={checked}
                            onChange={onChange}
                            onBlur={onBlur}
                            ref={ref}
                        ></input>
                        {isBool && (
                            <label
                                className={cn["check-label"]}
                                htmlFor={internalId}
                            />
                        )}
                        {Icon && <Icon className={cn["icon"]} />}
                    </div>
                    <div className={cn["utils-wrap"]}>
                        {onParams && (
                            <ParamsIcon
                                className={cn["params"]}
                                onClick={onParams}
                            />
                        )}
                        {onRemove && (
                            <Button
                                className={cn["remove"]}
                                onClick={onRemove}
                                type="button"
                            >
                                X
                            </Button>
                        )}
                    </div>
                    {error && <span className={cn["error"]}>{error}</span>}
                </div>
            </>
            // </div>
        );
    }
);
