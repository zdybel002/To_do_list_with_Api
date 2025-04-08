import { useEffect, useState, useContext } from "react";
import { TaskContext } from "../../../store/TaskContext";
import CurrentTaskItem from "./CurrentTaskItem";

import styles from "./CurrentTasks.module.css";

function CurrentTasks(props) {
    const { categoryId, categoryTitle, taskData, deleteTask } =
        useContext(TaskContext);

    const [currentOrFinishe, setCurrentOrFinished] = useState(0);

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
