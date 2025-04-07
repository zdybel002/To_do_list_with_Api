import { React, useEffect, useState, useContext } from "react";
import { TaskContext } from "../../../store/TaskContext";

import styles from "./CurrentTask.module.css";

function CurrentTask(props) {
    const { categoryId, categoryTitle, taskData, fetchTasks } =
        useContext(TaskContext);

    // const [Tasks, setTasks] = useState([]);
    // const [title, setTitle] = useState("");
    const [currentOrFinishe, setCurrentOrFinished] = useState(0);

    // useEffect(() => {
    //     if (categoryId !== null) {
    //         fetchTasks(categoryId); // Fetch tasks when idOfCategory changes
    //     }
    // }, [categoryId]);

    const handleChange = (event) => {
        if (event.target.value === "current") {
            setCurrentOrFinished(0);
        } else {
            setCurrentOrFinished(1);
        }
    };

    return (
        <div className={styles.CurrentTaskContainer}>
            <select name="browser" id="browser" onChange={handleChange}>
                <option value="current">Current</option>
                <option value="finished">Finished</option>
            </select>

            <header className={styles.currentTaskHeader}>
                <h3 className={styles.categoryHeading}>{categoryTitle}</h3>
            </header>

            <main>
                <ul className={styles.current_list}>
                    {taskData.map((task) => {
                        return (
                            <li key={task.id} className={styles.taskLiItem}>
                                <input
                                    type="checkbox"
                                    className={styles.currentTaskCheckbox}
                                />
                                <p className={styles.taskItemText}>
                                    {task.title}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </main>
        </div>
    );
}

export default CurrentTask;
