import React from 'react';
import styles from "./Sidenav.styles.scss";
import { LogOut, Truck, UserPlus, BarChart, ShoppingCart, DollarSign } from 'react-feather';

export function Sidenav() {
    return (
        <div class = "Sidenav">
            <div class="Logo" style={{backgroundImage: "url(/img/gsa_logo.png)"}}></div>
            <div class="Separator"></div>
            {/*replace the http local host with the link to*/}
            <a href="http://localhost:3000/transaction" class="SidenavBtn hover">
                <ShoppingCart class="Icon noHover"/>
                <div class="SidenavBtnText noHover">Start Transaction</div>
            </a>
            <a href="http://localhost:3000/productListing" class="SidenavBtn">
                <Truck class="Icon noHover"/>
                <div class="SidenavBtnText noHover">View Products</div>
            </a>
            <a href="http://localhost:3000/employeeDetails" class="SidenavBtn">
                <UserPlus class="Icon noHover"/>
                <div class="SidenavBtnText noHover">Create Employee</div>
            </a>
            <a href="http://localhost:3000/salesReport" class="SidenavBtn">
                <DollarSign class="Icon noHover"/>
                <div class="SidenavBtnText noHover">Sales Report</div>
            </a>
            <a href="http://localhost:3000/cashierReport" class="SidenavBtn">
                <BarChart class="Icon noHover"/>
                <div class="SidenavBtnText noHover">Cashier Report</div>
            </a>
            <div class="footer">
                <div class="Separator"></div>
                <a href="http://localhost:3000/" class="SignOutBtn">
                    <div class="SignOutBtnText">
                        Sign Out<LogOut class="Icon-Exit noHover"/>
                    </div>
                </a>
            </div>
        </div>
    )
}

export default Sidenav;