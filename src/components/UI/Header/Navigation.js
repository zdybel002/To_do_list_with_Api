import { useContext } from "react";
import React from "react";
import { LoginContext } from "../../../store/LoginProvider";
import { ProfileWindowContext } from "../../../store/ProfileWindowProvider";
import styles from "./Navigation.module.css";

const Navigation = (props) => {
    const { isLoggedIn, logoutHandler } = useContext(LoginContext);
    const profileContext = useContext(ProfileWindowContext);
    return (
        <nav className={styles.nav}>
            <ul>
                {isLoggedIn && (
                    <li>
                        <p onClick={profileContext.showProfileWindow}>
                            Your Profile
                        </p>
                    </li>
                )}
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
