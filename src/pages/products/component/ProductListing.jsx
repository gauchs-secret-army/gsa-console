import React from 'react';
import styles from "./ProductListing.module.scss";
import {Sidenav} from "../../../common/navigation/component/Sidenav";
import { Redirect, useLocation } from 'react-router';
import classNames from 'classnames';
import Item from "../../../common/features/component/Item";
import { Plus } from 'react-feather';


export function ProductListing() {
    const location = useLocation();
    window.localStorage.setItem('nextRoute', location.pathname);
    const user = JSON.parse(window.localStorage.getItem('user'));
    if(!user) {
        return <Redirect to="/" />
    } else {
        return (
            <div> 
                
                <div className={styles.rootDiv}>
                {
                    //inline if statement, checking if manager is true or false, if true then button if not then null.
                    //the {} is a way to get back into javascript mode
                    user.manager ? 
                    <div className={classNames(styles.Rectangle, styles.Text)} onClick={()=>alert("Functionality has not yet been implemented")}>
                    <Plus className={classNames(styles.Icon, styles.noHover)}/>
                    <div className={classNames(styles.Text)}>Create Item</div>
                    </div>
                    : null
                }
					<Item
					className={styles.Rectangle}
                    //passing to the item component, the only ones ill use are price name and image
					item={{"productID": 1,
                    "price": "20.50",
                    "stock": 1,
                    "image": <img className={styles.ItemBubble} src={"https://images.unsplash.com/photo-1588613254520-9d722c39aad5"}/>,
                    "name": "Benedryll"}}
					/>
                    {/*This is where everything relating to transaction component in here, 
                    this is where everything displayed will go, aka like fields*/
                    }
                </div>
                <Sidenav/>
            </div>
        )
    }
}

//export default Transaction;