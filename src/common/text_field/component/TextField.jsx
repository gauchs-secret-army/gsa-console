import React from 'react';
import classNames from 'classnames';

import styles from "./TextField.module.scss";

export function TextField(props) {
    var {className, ...props} = props;
    return (
        <div className={classNames(styles.textfield, className)}>
            <div className={styles.label}> { props.label } </div>
            <input
                {...props}
            />
            <div className={styles.label}>{ props.hint }</div>
        </div>
    )
}

export default TextField;