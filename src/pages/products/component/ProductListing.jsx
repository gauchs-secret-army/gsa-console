import React, { useState } from 'react';
import styles from "./ProductListing.module.scss";
import {Sidenav} from "../../../common/navigation/component/Sidenav";
import {TextField} from "../../../common/text_field/component/TextField";
import { Redirect, useLocation } from 'react-router';
import { Search } from 'react-feather';
import classNames from 'classnames';


export function ProductListing() {
    const location = useLocation();
    window.localStorage.setItem('nextRoute', location.pathname);
    const user = JSON.parse(window.localStorage.getItem('user'));
    const [search, setSearchField] = useState("");

    if(!user) {
        return <Redirect to="/" />
    } else {
        return (
            <div> 
                
                <div className={styles.searchbar}>
                <TextField
                    lead = {<Search className={classNames(styles.Icon, styles.noHover)}/>}
					className={styles.loginfield}
					placeholder="Ex. 12345, Vitamins, Male Supplements"
                    value={search}
                    onChange={e => setSearchField(e.target.value)}
				/>
                </div>
                <div className={styles.rootDiv}>
                    Products: Ibuprofen, Vitamin A tablets, Claritin
                    {/*This is where everything relating to transaction component in here, 
                    this is where everything displayed will go, aka like fields*/}
                    
                </div>
                <Sidenav/>
            </div>
        )
    }
}

//export default Transaction;