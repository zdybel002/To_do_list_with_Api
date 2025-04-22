import { useEffect, useState, useContext } from "react";
import { TaskContext } from "../../store/TaskContext";
import CurrentTaskItem from "./CurrentTask/CurrentTaskItem";

import styles from "./AllTasks.module.css";

function CurrentTasks(props) {
    const { categoryTitle, taskData, handleChangeStatus } =
        useContext(TaskContext);
    const [status, setStatus] = useState("current");

    const handleSelectChange = (event) => {
        const value = event.target.value;
        setStatus(value);
        handleChangeStatus(value);
    };

    return (
        <div className={styles.CurrentTaskContainer}>
            <select
                name="status"
                id="status"
                onChange={handleSelectChange}
                className={
                    status === "current"
                        ? styles.selectCurrent
                        : styles.selectFinished
                }
            >
                <option value="current">Current</option>
                <option value="finished">Finished</option>
            </select>

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
