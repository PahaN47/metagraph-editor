import { MouseEventHandler, useMemo } from "react";
import { FormField } from "../../../../types";
import cn from "./styles.module.scss";
import classNames from "classnames";
import { getSchemaFormSchema, getSchemaInputs, parseName } from "./utils";
import {
    FormProvider,
    Resolver,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import { Button } from "../../../Button";
import { CloseIcon } from "../../../../assets";
import { generateValidationSchema } from "../../../../utils";
import { useYupValidationResolver } from "../../hooks";

export type SchemaFormProps = {
    className?: string;
    initialSchema: Exclude<FormField, "items">;
    onSubmit?: SubmitHandler<FormField>;
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
    const type = initialSchema.type;
    const formSchema = useMemo(() => getSchemaFormSchema(type), [type]);

    const validationSchema = useMemo(
        () => generateValidationSchema(formSchema),
        [formSchema]
    );

    const children = useMemo(() => getSchemaInputs(formSchema), [formSchema]);

    const validationResolver = useYupValidationResolver(validationSchema);

    const { handleSubmit, register, ...formContext } = useForm<FormField>({
        defaultValues: initialSchema,
        resolver: validationResolver as Resolver<FormField>,
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
                    onSubmit={onSubmit && handleSubmit(onSubmit)}
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
