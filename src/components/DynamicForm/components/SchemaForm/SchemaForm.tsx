import { MouseEventHandler, useMemo } from "react";
import cn from "./styles.module.scss";
import classNames from "classnames";
import { getSchemaFormSchema, getSchemaInputs, parseName } from "./utils";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../../Button";
import { CloseIcon } from "../../../../assets";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";
import { FieldSchema } from "../../types";
import { getValidationSchema } from "../../utils";
import { Schema } from "yup";

export type SchemaFormProps = {
    className?: string;
    initialSchema?: Exclude<FieldSchema, "items">;
    onSubmit?: SubmitHandler<FieldSchema>;
    onClose?: MouseEventHandler<HTMLButtonElement>;
    name?: string;
};

export const SchemaForm = ({
    className,
    initialSchema,
    onSubmit,
    onClose,
    name,
}: SchemaFormProps) => {
    const displayName = parseName(name);
    const type = initialSchema?.type ?? "object";
    const formSchema = useMemo(() => getSchemaFormSchema(type), [type]);

    const validationSchema = useMemo(
        () => getValidationSchema(formSchema),
        [formSchema]
    );

    const children = useMemo(() => getSchemaInputs(formSchema), [formSchema]);

    const validationResolver = useYupValidationResolver(
        formSchema,
        validationSchema as Schema
    );

    const { handleSubmit, register, ...formContext } = useForm({
        defaultValues: initialSchema,
        resolver: validationResolver,
    });

    return (
        <div className={classNames(className, cn["wrap"])}>
            <span className={cn["title"]}>{displayName}</span>
            <button className={cn["close"]} onClick={onClose} type="button">
                <CloseIcon className={cn["close-icon"]} />
            </button>
            <FormProvider
                handleSubmit={handleSubmit}
                register={register}
                {...formContext}
            >
                <form
                    className={cn["form"]}
                    onSubmit={
                        onSubmit &&
                        handleSubmit(onSubmit as SubmitHandler<object>)
                    }
                >
                    {children}
                    <Button className={cn["submit"]} type="submit">
                        Сохранить
                    </Button>
                </form>
            </FormProvider>
        </div>
    );
};
