import React from 'react';
import styles from "./SalesReport.module.scss";
import {Sidenav} from "../../../common/navigation/component/Sidenav";


export function SalesReport() {
    return (
            <div> 
            
            <div className={styles.rootDiv}>
            
                Sales report Page
                {/*This is where everything relating to transaction component in here, 
                this is where everything displayed will go, aka like fields*/}
            
            </div>
            <Sidenav/>
        </div>
    )
}

//export default Transaction;