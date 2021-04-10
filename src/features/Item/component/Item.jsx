import React from 'react';
import classNames from 'classnames';

import styles from "./Item.module.scss";

export function Item(props) {
    //can add className to this list, the div item might be div className
    var {item, onClick, className,...props} = props;
    return (
        <div className={classNames(styles.Item, className)} onClick={onClick}>
            <div className={styles.Rectangle}>
            <div className={styles.image}>
                <img className={styles.ItemBubble} src={item.image}/>
            </div> 
            <div className={styles.name}> { item.name } </div> 
            <div className={styles.price}> { item.price } </div>
            </div>
        </div>
    )
}

export default Item;
