import React from "react";
import styles from "./TaskItemMenu.module.css";

function TaskItemMenu({ position, onEdit, onDelete, onClose }) {
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
        </div>
    );
}

export default TaskItemMenu;
