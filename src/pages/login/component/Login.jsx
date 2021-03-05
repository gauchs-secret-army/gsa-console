import React from 'react';
import styles from "./Login.module.scss";

export function Login() {
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
						<button className={styles.loginbutton}>Log In</button>
					</div>
				</div>
			</div>
		</div>
	)
}


export default Login;