import { useContext } from "react";
import React from "react";
import { LoginContext } from "../../../store/LoginProvider";

import styles from "./Navigation.module.css";

const Navigation = (props) => {
    const { isLoggedIn, logoutHandler } = useContext(LoginContext);

    return (
        <nav className={styles.nav}>
            <ul>
                {/* {isLoggedIn && (
                    <li>
                        <a href="/">Админ</a>
                    </li>
                )} */}
                {isLoggedIn && (
                    <li>
                        <button onClick={logoutHandler}>Log out</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;
