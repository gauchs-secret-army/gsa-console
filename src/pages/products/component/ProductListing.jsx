import React, { useEffect, useState } from 'react';
import styles from "./ProductListing.module.scss";
import {Sidenav} from "../../../common/navigation/component/Sidenav";
import {TextField} from "../../../common/input/text_field/component/TextField";
import { Redirect, useLocation } from 'react-router';
import classNames from 'classnames';
import {Item} from "../../../common/features/component/Item";
import { Plus, Search } from 'react-feather';


export function ProductListing() {
    const location = useLocation();
    window.localStorage.setItem('nextRoute', location.pathname);
    const user = JSON.parse(window.localStorage.getItem('user'));
    const [search, setSearchField] = useState("");
    const [items, setItems] = useState([]);

    useEffect(() => {
        callSearch();
    }, []);

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
            var itemList = [];
            JSON.parse(result).map((prod, index) => {
                itemList.push(
                    <Item
                        key={index}
                        item={prod}
                    />
                )
            });
            setItems(itemList);
        })
        .catch(error => console.log('error', error));
    }

    if(!user) {
        return <Redirect to="/" />
    } else {
        return (
            <div className={styles.rootDiv}> 
                <div className={styles.searchbar}>
                    <TextField
                        lead = {<Search className={classNames(styles.Icon, styles.noHover)}/>}
                        className={styles.loginfield}
                        placeholder="Ex. 12345, Vitamins, Male Supplements"
                        value={search}
                        onChange={e => {
                            if(search !== e.target.value) {
                                setSearchField(e.target.value);
                                callSearch();
                            }
                        }}
                    />
                </div>
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
                {/* <Item
                    className={styles.Rectangle}
                    //passing to the item component, the only ones ill use are price name and image
                    item={{"productID": 1,
                        "price": "20.50",
                        "stock": 1,
                        "image": <img className={styles.ItemBubble} src={"https://images.unsplash.com/photo-1588613254520-9d722c39aad5"}/>,
                        "name": "Benedryll"
                    }}
                /> */}
                { items }

                <Sidenav/>
            </div>
        )
    }
}

export default ProductListing;