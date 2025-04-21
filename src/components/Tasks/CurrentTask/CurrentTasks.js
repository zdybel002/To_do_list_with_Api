import { useEffect, useState, useContext } from "react";
import { TaskContext } from "../../../store/TaskContext";
import CurrentTaskItem from "./CurrentTaskItem";

import styles from "./CurrentTasks.module.css";

function CurrentTasks(props) {
    const { categoryTitle, taskData } = useContext(TaskContext);

    return (
        <div className={styles.CurrentTaskContainer}>
            <header className={styles.currentTaskHeader}>
                <h3 className={styles.categoryHeading}>{categoryTitle}</h3>
            </header>

            <main>
                <ul className={styles.current_list}>
                    {taskData.map((task) => (
                        <CurrentTaskItem
                            key={task.id}
                            id={task.id}
                            title={task.title}
                        />
                    ))}
                </ul>
            </main>
        </div>
    );
}

export default CurrentTasks;
