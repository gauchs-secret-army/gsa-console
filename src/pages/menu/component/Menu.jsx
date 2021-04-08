import React from 'react';
import styles from "./Menu.module.scss";
import {Sidenav} from "../../../common/navigation/component/Sidenav";
import { Redirect, useLocation } from 'react-router';


export function Menu() {
    const location = useLocation();
    window.localStorage.setItem('nextRoute', location.pathname);
    const user = JSON.parse(window.localStorage.getItem('user'));
    if(!user) {
      return <Redirect to="/" />
    } else {
        return (
            <div> 
                <div className={styles.rootDiv}>
                    Welcome to the Main Menu Page!
                    {/*This is where everything relating to transaction component in here, 
                    this is where everything displayed will go, aka like fields*/}
                
                </div>
                <Sidenav/>
            </div>
        )
    }
}

//export default Transaction;