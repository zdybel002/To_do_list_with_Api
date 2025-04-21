import React from "react";

import Navigation from "./Navigation";
import styles from "./MainHeader.module.css";
import logo from "./img/logo.png";

const MainHeader = (props) => {
    return (
        <header className={styles["main-header"]}>
            <div className={styles.container_logo}>
                <img src={logo} alt="some" className={styles.header_img_logo} />
                <h3 className={styles.header_logo_heading}>Task Manager</h3>
            </div>
            <Navigation />
        </header>
    );
};

export default MainHeader;
