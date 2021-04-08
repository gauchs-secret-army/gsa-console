import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.scss';

import {Login} from './pages/login/component/Login';
import {Transaction} from './pages/transaction/component/Transaction';
import {ProductListing} from './pages/products/component/ProductListing';
import {EmployeeDetails} from './pages/employee/component/EmployeeDetails';
import {SalesReport} from './pages/salesReport/component/SalesReport';
import {CashierReport} from './pages/cashierReport/component/CashierReport';
import {Menu} from './pages/menu/component/Menu';

function App() {

/*puts side nav in, setting routes for each link, directly renders each part and sends that part of the website out*/
  return (
      <Router>
        <Switch>
          <Route path="/transaction">{/*link to these, basically copy what hes done here, This is the URL path */}
            <Transaction/>{/*This is basically redrwaing the pageon same canvas*/}
            {/* Insert Transaction Page Component this will be shown to user
            generate compontents and call components here
            take the nav folder from common, and make a new folder called page, and make
            starter page for each page. */}
          </Route>
          <Route path="/productListing">
            <ProductListing/>{/* Insert Products Page Component */}
          </Route>
          <Route path="/employeeDetails">
            <EmployeeDetails/>{/* Insert User Page Component */}
          </Route>
          <Route path="/salesReport">
            <SalesReport/>{/* Insert Sales Report Page Component */}
          </Route>
          <Route path="/cashierReport">
            <CashierReport/> {/* Insert User Report Page Component */}
          </Route>
          <Route path="/menu">
            <Menu />
          </Route>

          <Route path="/">
            <Login />
            {/* <div className="App">
              <Sidenav/>
              <ul>
                {
                  employees.length < 1 ? <h3>No employees found!</h3>
                  : employees.map((emp, id) => {
                    return <li key={id}>
                      <h3>{emp.firstName} {emp.lastName}</h3>
                      <p>{emp.address}, {emp.city}</p>
                    </li>
                  })
                }
              </ul>
            </div> */}
          </Route>
        </Switch>
      </Router>

  );
}


export default App;
