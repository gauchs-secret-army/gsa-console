import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.scss';

function App() {
  let [employees, setEmployees ] = useState([]);
  useEffect(() => {
    fetch("https://gsa-backend-api.herokuapp.com/employees", {
      method: 'GET',
      redirect: 'follow'
    })
    .then(response => response.text())
    .then(result => {
      let list = JSON.parse(result);
      console.log(list);
      setEmployees(list);
    })
    .catch(error => console.log('error', error));
  }, []);


  return (
    <Router>
      <Switch>
        <Route path="/transaction">
          {/* Insert Transaction Page Component */}
        </Route>
        <Route path="/products">
          {/* Insert Products Page Component */}
        </Route>
        <Route path="/user">
          {/* Insert User Page Component */}
        </Route>
        <Route path="/report/sales">
          {/* Insert Sales Report Page Component */}
        </Route>
        <Route path="/report/user">
          {/* Insert User Report Page Component */}
        </Route>

        <Route path="/">
          <div className="App">
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
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

function validateUser(id, password)
{
  if(id != "" && isNumeric(id) && password != "" && id.length <= 5)
  {
    return true;
  }
  return false;
}


export default App;
