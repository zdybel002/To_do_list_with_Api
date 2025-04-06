import React from "react";

import styles from "./Navigation.module.css";
// import AuthContext from "../../store/auth-contex";

const Navigation = (props) => {
    // const ctx = useContext(AuthContext);
    return (
        <nav className={styles.nav}>
            {/* <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Пользователи</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Админ</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.onLogout}>Выйти</button>
          </li>
        )}
      </ul> */}

            <ul>
                {props.isAutherticated && (
                    <li>
                        <a href="/">Пользователи</a>
                    </li>
                )}
                {props.isAutherticated && (
                    <li>
                        <a href="/">Админ</a>
                    </li>
                )}
                {props.isAutherticated && (
                    <li>
                        <button onClick={props.onLogout}>Выйти</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;
