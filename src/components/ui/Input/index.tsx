import React from "react";
import classNames from "classnames/bind";
import {IInput} from "./index.interfaces";
import styles from './index.module.sass';


const cx = classNames.bind(styles);

export const Input = React.forwardRef<HTMLInputElement, IInput>(
    (props, ref) => {
        const {placeholder, type, title, id, value, onChange, required, children, ...inputProps} = props;
        return (
            <input
                ref={ref}
                type={type}
                title={title}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
                className={cx({
                    input: true,
                })}
                id={id}
                {...inputProps}
            >
                {children}
            </input>
        );
    }
);