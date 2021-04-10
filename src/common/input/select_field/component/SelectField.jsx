import React from 'react';
import classNames from 'classnames';
import { ChevronDown } from 'react-feather';

import styles from "./SelectField.module.scss";

export function SelectField(props) {
    var {className, options, ...props} = props;
    return (
        <div className={classNames(styles.textfield, className)}>
            <div className={styles.label}> { props.label } </div>
            <div className={styles.inputContainer}>
                <select
                    {...props}
                >
                    { options.map(opt => <option value={opt.value}> {opt.label }</option>) }
                </select>
                <ChevronDown className={styles.arrow}/>
            </div>
            <div className={styles.label}>{ props.hint }</div>
        </div>
    )
}

export default SelectField;