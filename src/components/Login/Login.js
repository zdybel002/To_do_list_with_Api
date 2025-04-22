import React, { useContext, useState } from "react";
import Card from "../UI/Card/Card";
import { LoginContext } from "../../store/LoginProvider";

import styles from "./Login.module.css";

const Login = () => {
    const { checkLogin, loginError } = useContext(LoginContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginClick = () => {
        checkLogin(email, password);
    };

    // Profile context

    return (
        <Card className={styles.login}>
            <div className={styles.loginContainer}>
                <h2 className={styles.title}>Task Manager</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.loginInput}
                />
                <input
                    type="password"
                    placeholder="Hasło"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.loginInput}
                />
                <div className={styles.loginActions}>
                    <button
                        onClick={handleLoginClick}
                        className={styles.loginButton}
                    >
                        Log in
                    </button>
                </div>
            </div>
            {loginError && <p className={styles.error}>{loginError}</p>}
        </Card>
    );
};

export default Login;
