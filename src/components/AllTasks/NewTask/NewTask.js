import React from "react";
import styles from "./NewTask.module.css";

function NewTask(props) {
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            console.log("Wpisano:", event.target.value);
            event.target.value = "";
        }
    };

    return (
        <>
            <input
                type="text"
                placeholder="Add New Task Press Enter to save"
                onKeyDown={handleKeyDown}
                className={styles.task_input}
            />
        </>
    );
}

export default NewTask;
