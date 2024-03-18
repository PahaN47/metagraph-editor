import { ButtonHTMLAttributes } from "react";
import cn from "./styles.module.scss";
import classNames from "classnames";

export const Button = ({
    className,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button className={classNames(className, cn["button"])} {...props} />
);
