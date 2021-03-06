import React, { useState } from 'react';

import styles from "./Login.module.scss";
import TextField from "../../../common/text_field/component/TextField";

export function Login() {
	const [userID, setUserID] = useState("");
	const [pass, setPass] = useState("");

	function callLogin() {
		if(validateUser(userID, pass)) {
			var raw = JSON.stringify({
				"employeeID": parseInt(userID),
				"password": pass
			});

			fetch("https://gsa-backend-api.herokuapp.com/signin", {
				method: 'POST',
				headers: {
    				'Content-Type': 'application/json' 
				},
				body: raw,
				redirect: 'follow'
			})
			.then(response => {
				if(response.status == 401) {
					alert("User ID or Password is invalid!");
				} else {
					return response.text();
				}
			})
			.then(result => {
				window.localStorage.setItem('user', {
					employeeID: userID,
					manager: result
				}.toString());
				window.location = window.localStorage.getItem('nextRoute') || "/transaction";
			}).catch(error => console.log('error', error));
		} else {
			alert("User ID or Password is invalid!");
		}
	}

	function validateUser(id, password)
	{
		if(id !== "" && /^[0-9]*$/.test(id) && password !== "" && id.length <= 5)
		{
			return true;
		}
		return false;
	}

	return(
		<div className={styles.login}>
			<div className={styles.grid}>
				<div className={styles.cell, styles.left}>
					<div className={styles.logo}>
						<img src={process.env.PUBLIC_URL+"img/logo.png"}></img>
					</div>
					<p>*Not officially endorsed by Dr. John Gauch or anyone in the Gauch family</p>
				</div>
				<div className={styles.cell, styles.right}>
					<div className={styles.loginblock}>
						<TextField
							className={styles.loginfield}
							label="Employee ID"
							placeholder="Ex. 123456789"
							pattern="^[0-9]*$"
							value={userID}
							onChange={e => setUserID(e.target.value)}
						/>
						<TextField
							className={styles.loginfield}
							label="Password"
							type="password"
							placeholder="********"
							value={pass}
							onChange={e => setPass(e.target.value)}
						/>

						<button className={styles.loginbtn} onClick={() => callLogin()}>Log In</button>
					</div>
				</div>
			</div>
		</div>
	)
}


export default Login;