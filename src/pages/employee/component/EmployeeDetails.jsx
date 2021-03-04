import React from 'react';
import styles from "./EmployeeDetails.styles.scss";
import {Sidenav} from "../../../common/navigation/component/Sidenav";


export function EmployeeDetails() {
    return (
        <div> 
            <div class="rootDiv">
            
                Employee Page!
                {/*This is where everything relating to transaction component in here, 
                this is where everything displayed will go, aka like fields*/}
            
            </div>
            <Sidenav/>
        </div>
    )
}

//export default Transaction;