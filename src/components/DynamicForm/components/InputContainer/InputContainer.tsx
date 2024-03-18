import { PropsWithChildren } from "react";
import { getFieldShortName } from "../../utils";
import cn from "./styles.module.scss";
import classNames from "classnames";
import { Button } from "../../../Button";
import { ParamsIcon } from "../../../../assets";

export type InputContainerProps = PropsWithChildren<{
    className?: string;
    name?: string;
    onAppend?: () => void;
    onRemove?: () => void;
    onParams?: () => void;
    error?: string;
}>;

export const InputContainer = ({
    className,
    children,
    name,
    onAppend,
    onRemove,
    onParams,
    error,
}: InputContainerProps) => {
    const shortName = getFieldShortName(name);
    return (
        // <div
        //     className={classNames(className, cn["wrap"])}
        //     data-noname={!shortName}
        // >
        <>
            {shortName && <span className={cn["label"]}>{shortName}: </span>}
            <div className={classNames(className, cn["wrap"])}>
                <div
                    className={classNames(
                        cn["input-wrap"],
                        error && cn["with-error"]
                    )}
                >
                    {children}

                    {onAppend && (
                        <Button
                            className={cn["append"]}
                            onClick={onAppend}
                            type="button"
                        >
                            +
                        </Button>
                    )}
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
};
