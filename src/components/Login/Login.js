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

    return (
        <Card className={styles.login}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.actions}>
                <button onClick={handleLoginClick}>Zaloguj</button>
            </div>
            {loginError && <p className={styles.error}>{loginError}</p>}
        </Card>
    );
};

export default Login;
