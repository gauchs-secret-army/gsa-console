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
    const [items, setItems] = useState([]);
    var searchTimer = setTimeout(callSearch(), 0);

    function callSearch() {
        var raw = JSON.stringify({
            "term": search,
            "items": "17",
            "page": 1
        });
          
        fetch("https://gsa-backend-api.herokuapp.com/products", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: raw,
            redirect: 'follow'
        })
        .then(response => response.text())
        .then(result => {
            console.log(result);
            setItems(result);
        })
        .catch(error => console.log('error', error));
    }

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
                    onChange={e => {
                        setSearchField(e.target.value)
                        clearTimeout(searchTimer);
                        searchTimer = setTimeout(callSearch(), 800);
                    }}
				/>
                </div>
                <div className={styles.rootDiv}>
                    Products: { items }

                    {/*This is where everything relating to transaction component in here, 
                    this is where everything displayed will go, aka like fields*/}
                </div>
                <Sidenav/>
            </div>
        )
    }
}

//export default Transaction;