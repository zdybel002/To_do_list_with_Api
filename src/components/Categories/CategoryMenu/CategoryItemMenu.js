import React from "react";
import styles from "./CategoryItemMenu.module.css";

function ContextMenu({ position, onEdit, onDelete, onClose }) {
    return (
        <div
            className={styles.context_menu}
            style={{
                position: "absolute",
                top: `${position.y}px`,
                left: `${position.x}px`,
            }}
        >
            <button onClick={onEdit} className={styles.buttonStyle}>
                Edit
            </button>
            <button onClick={onDelete} className={styles.buttonStyle}>
                Delete
            </button>
            <button onClick={onClose} className={styles.buttonStyle}>
                ✖
            </button>
        </div>
    );
}

export default ContextMenu;
