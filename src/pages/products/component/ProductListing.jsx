import React from 'react';
import styles from "./ProductListing.module.scss";
import {Sidenav} from "../../../common/navigation/component/Sidenav";


export function ProductListing() {
    return (
        <div> 
            
            <div class="rootDiv">
                Products: Ibuprofen, Vitamin A tablets, Claritin
                {/*This is where everything relating to transaction component in here, 
                this is where everything displayed will go, aka like fields*/}
            
            </div>
            <Sidenav/>
        </div>
    )
}

//export default Transaction;