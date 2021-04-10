import React, { useEffect, useState } from 'react';
import GridLoader from 'react-spinners/GridLoader';
import FadeLoader from 'react-spinners/FadeLoader';

import styles from "./Login.module.scss";
import colors from "../../../common/styles/colors.module.scss";
import TextField from "../../../common/input/text_field/component/TextField";
import classNames from 'classnames';

//sorry reetik
//im adding this
export function Login() {
	const [userID, setUserID] = useState(window.localStorage.getItem('new_user'));
	const [pass, setPass] = useState("");
	const [loading, setLoading] = useState(true);
	const [loginLoading, setLoginLoading] = useState(false);
	const [isInit, setInit] = useState(false);

	useEffect(() => {
		fetch("https://gsa-backend-api.herokuapp.com/employees", {
			method: 'GET',
			redirect: 'follow'
		})
		.then(response => response.json())
		.then(result => {
			console.log(result)
			if(result.length === 0) {
				setInit(true);
			}
		}).catch(error => console.log('error', error))
		.finally(function() {
			setLoading(false);
		});
	});

	function callLogin() {
		setLoginLoading(true);
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
				window.location = "/menu";
			}).catch(error => console.log('error', error))
			.finally(function() {
				setLoginLoading(false);
			});
		} else {
			alert("User ID or Password is invalid!");
			setLoginLoading(false);
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
						{ loading ? 
							<div className={styles.mainLoader}>
								<FadeLoader 
									height="25" 
									width="18"
									radius="10"
									margin="15"
									color={colors.light}
									css={{ left: 25.5 }}
								/>
								<p>Fetching some data...</p>
							</div> :

							(isInit ? 
								<div className={styles.initBlock}>
									<p>There are no registered users. You can start the registration process below.</p>
									<button className={styles.loginbtn} onClick={() => window.location = "/employeeDetails"}>
										Register New User
									</button>
								</div> :
								<div>
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
										onKeyDown={e => {
											if(e.key === 'Enter') {
												callLogin();
											}
										}}
									/>

									<button type="submit" className={styles.loginbtn} onClick={() => callLogin()}>
										{ loginLoading ? 
											<GridLoader color={colors.light} size={15} />
											: "Log In"
										}
									</button>
								</div>
							)
						}
					</div>
				</div>
			</div>
		</div>
	)
}


export default Login;