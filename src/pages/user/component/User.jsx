import React from 'react';
import styles from "./User.styles.scss";
import {Sidenav} from "../../../common/navigation/component/Sidenav";


export function User() {
    return (
        <div>
            <Sidenav/>  
            User Page
            {/*This is where everything relating to transaction component in here, 
            this is where everything displayed will go, aka like fields*/}
        </div>
    )
}

//export default Transaction;