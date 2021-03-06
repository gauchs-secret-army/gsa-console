import React from 'react';
import styles from "./Sidenav.module.scss";
import { LogOut, Truck, UserPlus, BarChart, ShoppingCart, DollarSign } from 'react-feather';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export function Sidenav() {
    return (
        <div className={styles.Sidenav}>
            <div className={styles.Logo} style={{backgroundImage: "url(/img/gsa_logo.png)"}}></div>
            <div className={styles.Separator}></div>
            {/*replace the http local host with the link to*/}
            <Link to="/transaction" className={styles.SidenavBtn}>
                <ShoppingCart className={classNames(styles.Icon, styles.noHover)}/>
                <div className={classNames(styles.SidenavBtnText, styles.noHover)}>Start Transaction</div>
            </Link>
            <Link to="/productListing" className={styles.SidenavBtn}>
                <Truck className={classNames(styles.Icon, styles.noHover)}/>
                <div className={classNames(styles.SidenavBtnText, styles.noHover)}>View Products</div>
            </Link>
            <Link to="/employeeDetails" className={styles.SidenavBtn}>
                <UserPlus className={classNames(styles.Icon, styles.noHover)}/>
                <div className={classNames(styles.SidenavBtnText, styles.noHover)}>Create Employee</div>
            </Link>
            <Link to="/salesReport" className={styles.SidenavBtn}>
                <DollarSign className={classNames(styles.Icon, styles.noHover)}/>
                <div className={classNames(styles.SidenavBtnText, styles.noHover)}>Sales Report</div>
            </Link>
            <Link to="/cashierReport" className={styles.SidenavBtn}>
                <BarChart className={classNames(styles.Icon, styles.noHover)}/>
                <div className={classNames(styles.SidenavBtnText, styles.noHover)}>Cashier Report</div>
            </Link>
            <div className={styles.footer}>
                <div className={styles.Separator}></div>
                <a onClick={() => window.localStorage.removeItem('user')} className={styles.SignOutBtn}>
                    <div className={styles.SignOutBtnText}>
                        Sign Out<LogOut className={classNames(styles.IconExit, styles.noHover)}/>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default Sidenav;