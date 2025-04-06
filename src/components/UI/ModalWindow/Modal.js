import React from "react";
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";

const BackDrop = (props) => {
    return <div className={styles.backdrop} onClick={props.onHideCart}></div>;
};

const ModalWindow = (props) => {
    return (
        <div className={styles.modal}>
            <div className={styles.content}>{props.children}</div>
        </div>
    );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<BackDrop onHideCart={props.onHideCart} />, portalElement)}
            {ReactDOM.createPortal(
                <ModalWindow>{props.children}</ModalWindow>,
                portalElement
            )}
        </React.Fragment>
    );
};

export default Modal;
