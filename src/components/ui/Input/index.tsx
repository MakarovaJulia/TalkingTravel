import React, {FC, useRef} from "react";
import classNames from "classnames/bind";
import {IInput} from "./index.interfaces";
import styles from './index.module.sass';


const cx = classNames.bind(styles);

export const Input = React.forwardRef<HTMLInputElement, IInput>(
    (props, ref) => {
        const { placeholder, type, id, value, onChange, ...inputProps} = props;
        return (
            <input
                ref={ref}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={cx({
                    input: true,
                })}
                id={id}
                {...inputProps}
            />
        );
    }
);