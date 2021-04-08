import React, { useState } from 'react';
import { Redirect, useLocation } from 'react-router';
import GridLoader from 'react-spinners/GridLoader';

import styles from "./EmployeeDetails.module.scss";
import colors from "../../../common/styles/colors.module.scss";
import {Sidenav} from "../../../common/navigation/component/Sidenav";
import {TextField} from "../../../common/input/text_field/component/TextField";
import {TextField} from "../../../common/text_field/component/TextField";

export function EmployeeDetails() {
    const [loading, setLoading] = useState(false);
    const [userID, setUserID] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [pass, setPass] = useState("");
    const [verifyPass, setVerifyPass] = useState("");
    const [empType, setEmpType] = useState("");

	function registerUser() {
		setLoading(true);
		if(validateEntries()) {
			var raw = JSON.stringify({
				"employeeID": userID,
				"firstName": firstName,
				"lastName": lastName,
				"password": pass,
				"active": true,
				"role": empType,
				"managerID": 1
			});

			fetch("https://gsa-backend-api.herokuapp.com/register", {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: raw,
				redirect: 'follow'
			})
			.then(response => {
				if(response.status === 200) {
					alert("User has successfully been created!");
					window.localStorage.removeItem('nextRoute');
					return response.json();
				} else {
					alert("Error creating user! Please try again later or contact support at (479) 866-7051.");
				}
			})
			.then(data => {
				window.localStorage.setItem('new_user', data);
				window.location = "/";
			})
			.catch(error => alert("Error creating user! Please try again later or contact sales support at (479) 866-7051."))
			.finally(() => setLoading(false));
		} else {
			setLoading(false);
		}
	}

	function clearEntries() {
		setUserID("");
		setFirstName("");
		setLastName("");
		setPass("");
		setVerifyPass("");
		setEmpType("");
	}

	function validateEntries() {
		if(userID === "" || !/^[0-9]{1,5}$/.test(userID)) {
			alert("User ID should be a numeric value with 5 or fewer numbers!");
			return false;
		}
		if(pass === "") {
			alert("Password should not be empty!");
			return false;
		}
		if(pass !== verifyPass) {
			alert("Passwords do not match!");
			return false;
		}
		if(empType === "") {
			alert("Please define a employee type!");
		}
		return true;
	}

    const location = useLocation();
    window.localStorage.setItem('nextRoute', location.pathname);
    const user = JSON.parse(window.localStorage.getItem('user'));
    // if(!user) {
    //   return <Redirect to="/" />
    // } else {
        return (
            <div> 
                <div className={styles.rootDiv}>
                
                    Employee Page!
                    {/*This is where everything relating to transaction component in here, 
                    this is where everything displayed will go, aka like fields*/}
                    <div className={styles.block}>
                        <TextField
							className={styles.loginfield}
							label="Employee ID"
							placeholder="Ex. 123456789"
							value={userID}
							onChange={e => setUserID(e.target.value)}
						/>
                        <TextField
							className={styles.loginfield}
							label="First Name"
							placeholder="Ex. John"
							value={firstName}
							onChange={e => setFirstName(e.target.value)}
						/>
                        <TextField
							className={styles.loginfield}
							label="Last Name"
							placeholder="Ex. Gauch"
							value={lastName}
							onChange={e => setLastName(e.target.value)}
						/>
                        <TextField
							className={styles.loginfield}
							label="Password"
							type="password"
							placeholder="********"
							value={pass}
							onChange={e => setPass(e.target.value)}
						/>
                        <TextField
							className={styles.loginfield}
							label="Verify Password"
							type="password"
							placeholder="********"
							value={verifyPass}
							onChange={e => setVerifyPass(e.target.value)}
						/>
                        <TextField
							className={styles.loginfield}
							label="Employee Type"
							placeholder="Ex. General Manager"
							value={empType}
							onChange={e => setEmpType(e.target.value)}
						/>
						<button className={styles.createBtn} onClick={() => registerUser()}>
							{ loading ? 
								<GridLoader color={colors.light} size={15} />
								: "Create Account"
							}
						</button>
                    </div>
                </div>
                <Sidenav/>
            </div>
        )
    // }
}

//export default Transaction;