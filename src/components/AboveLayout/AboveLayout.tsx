import classNames from "classnames";
import { PropsWithChildren } from "react";
import cn from "./styles.module.scss";

export type AboveLayoutProps = PropsWithChildren<{
    className?: string;
    visible?: boolean;
}>;

export const AboveLayout = ({
    className,
    visible,
    children,
}: AboveLayoutProps) => {
    return (
        <div
            className={classNames(
                className,
                cn["layout"],
                visible && cn["visible"]
            )}
        >
            {visible && children}
        </div>
    );
};
