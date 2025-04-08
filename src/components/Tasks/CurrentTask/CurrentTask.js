import { useEffect, useState, useContext } from "react";
import { TaskContext } from "../../../store/TaskContext";
import styles from "./CurrentTask.module.css";

function CurrentTask(props) {
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

    // ⬇️ Zmieniamy pojedynczy stan na obiekt
    const [checkedState, setCheckedState] = useState({});

    // Inicjalizuj checkedState kiedy taskData się zmieni
    useEffect(() => {
        const initialState = {};
        taskData.forEach((task) => {
            initialState[task.id] = false;
        });
        setCheckedState(initialState);
    }, [taskData]);

    const handleCheckboxChange = (event) => {
        const checkboxId = event.target.id;
        const checked = event.target.checked;

        setCheckedState((prevState) => ({
            ...prevState,
            [checkboxId]: checked,
        }));

        if (checked) {
            deleteTask(checkboxId);
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
                        <li key={task.id} className={styles.taskLiItem}>
                            <input
                                id={task.id}
                                type="checkbox"
                                className={styles.currentTaskCheckbox}
                                checked={checkedState[task.id] || false}
                                onChange={handleCheckboxChange}
                            />
                            <p className={styles.taskItemText}>{task.title}</p>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}

export default CurrentTask;
