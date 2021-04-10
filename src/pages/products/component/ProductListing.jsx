import React, { useEffect, useState } from 'react';
import styles from "./ProductListing.module.scss";
import colors from "../../../common/styles/colors.module.scss";
import {Sidenav} from "../../../common/navigation/component/Sidenav";
import {TextField} from "../../../common/input/text_field/component/TextField";
import { Redirect, useLocation } from 'react-router';
import classNames from 'classnames';
import {Item} from "../../../features/Item/component/Item";
import { Plus, Search } from 'react-feather';
import GridLoader from 'react-spinners/GridLoader';
import {ItemForm} from '../../../features/ItemForm/component/Itemform';
import Modal from 'react-modal';

export function ProductListing() {
    const location = useLocation();
    window.localStorage.setItem('nextRoute', location.pathname);
    const user = JSON.parse(window.localStorage.getItem('user'));
    const [search, setSearchField] = useState("");
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalState, setModalState] = useState(false);
    const [selectedApp, setSelApp] = useState({});

    useEffect(() => {
        callSearch();
    }, []);

    function callSearch() {
        setLoading(true);
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
                        onClick={() => {
                            setSelApp(prod);
                            setModalState(true);
                        }}
                    />
                )
            });
            setItems(itemList);
        })
        .catch(error => alert("Error retrieving items! Please try again later or contact support at (479) 866-7051."))
        .finally(() => {
            setLoading(false);
        })
    }

    if(!user) {
        return <Redirect to="/" />
    } else {
        return (
            <div className={styles.rootDiv}>
                <div className={styles.searchbar}>
                    <TextField
                        lead={<Search className={classNames(styles.Icon, styles.noHover)}/>}
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
                    loading ?
                        <div className={styles.loader}>
                            <GridLoader
                                className={styles.loader}
                                color={colors.green}
                                size={15} 
                            />
                        </div>
                    : 
                        <div className={styles.itemList}>
                            {
                                //inline if statement, checking if manager is true or false, if true then button if not then null.
                                //the {} is a way to get back into javascript mode
                                user.manager ? 
                                    <div className={classNames(styles.Rectangle)} onClick={()=> {
                                        setModalState(true);
                                    }}>
                                        <Plus className={classNames(styles.Icon, styles.noHover)}/>
                                        <div className={classNames(styles.Text)}>Create Item</div>
                                    </div>
                                : null
                            }
                            { items }
                        </div>
                }
                <Sidenav/>
                <Modal
                    isOpen={modalState}
                    onRequestClose={() => {
                        setModalState(false);
                        setSelApp({});
                    }}
                    className={styles.modal}
                >
                    <ItemForm item={selectedApp} close={() => {
                        setModalState(false);
                        setSelApp({});
                    }}/>
                </Modal>
            </div>
        )
    }
}

export default ProductListing;