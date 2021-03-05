import React from 'react';
import styles from "./Login.module.scss";

export function Login() {
	return(
		<div className={styles.login}>
			<img src={process.env.PUBLIC_URL+"img/logo.png"}></img>
			<div className={styles.loginblock}>
			<div className={styles.idtext}></div>
			</div>
			<div className={styles.textbox}></div>
			<div className={styles.textbox}></div>
			<button className={styles.loginbutton}>Log In</button>
		</div>
		)
}


export default Login;