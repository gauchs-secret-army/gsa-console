import React, { useState } from 'react';
import GridLoader from 'react-spinners/GridLoader';

import styles from "./Login.module.scss";
import colors from "../../../common/styles/colors.module.scss";
import TextField from "../../../common/text_field/component/TextField";
import classNames from 'classnames';

export function Login() {
	const [userID, setUserID] = useState("");
	const [pass, setPass] = useState("");
	const [loading, setLoading] = useState(false);

	function callLogin() {
		setLoading(true);
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
				if(response.status === 401) {
					alert("User ID or Password is invalid!");
				} else {
					return response.text();
				}
			})
			.then(result => {
				window.localStorage.setItem('user', JSON.stringify({
					employeeID: userID,
					manager: JSON.parse(result)
				}));
				window.location = window.localStorage.getItem('nextRoute') || "/menu";
			}).catch(error => console.log('error', error))
			.finally(function() {
				setLoading(false);
			});
		} else {
			alert("User ID or Password is invalid!");
			setLoading(false);
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
				<div className={classNames(styles.cell, styles.left)}>
					<div className={styles.logo}>
						<img src={process.env.PUBLIC_URL+"img/logo.png"} alt="logo"></img>
					</div>
					<p>*Not officially endorsed by Dr. John Gauch or anyone in the Gauch family</p>
				</div>
				<div className={classNames(styles.cell, styles.right)}>
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

						<button className={styles.loginbtn} onClick={() => callLogin()}>
							{ loading ? 
								<GridLoader color={colors.light} size={15} />
								: "Log In"
							}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}


export default Login;