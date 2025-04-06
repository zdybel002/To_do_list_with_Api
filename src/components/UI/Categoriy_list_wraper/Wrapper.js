import React from "react";
import styles from "./Wrapper.module.css";

function Wrapper({ children, onClick }) {
    return (
        <div className={styles.main_block} onClick={onClick}>
            {children}
        </div>
    );
}

export default Wrapper;
