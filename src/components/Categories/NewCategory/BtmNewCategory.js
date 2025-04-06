import styles from "./BtmNewCategory.module.css";
import { React, useContext } from "react";

import { ModalWindowContext } from "../../../store/ModalWindowProvider";

const BtmNewCategory = (props) => {
    const modalContext = useContext(ModalWindowContext);

    return (
        <>
            <div className={styles.fixedBottomLeft}>
                <button
                    className={styles.header_btm}
                    onClick={modalContext.showWindowHandler}
                >
                    Add New Category
                </button>
            </div>
        </>
    );
};

export default BtmNewCategory;
