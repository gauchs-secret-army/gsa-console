import React from 'react';
import classNames from 'classnames';


import styles from "./TextField.module.scss";

export function TextField(props) {
    var {className, ...props} = props;
    return (
        <div className={classNames(styles.textfield, className)}>
            { 
                props.label ? 
                    <div className={styles.label}> { props.label }  </div>
                : null
            }
            <div className={styles.content}>
                <div className={styles.lead}> { props.lead } </div>
                <input
                    {...props}
                />
            </div>
            {
                props.hint ?
                    <div className={styles.label}>{ props.hint }</div>
                : null
            }
        </div>
    )
}

export default TextField;