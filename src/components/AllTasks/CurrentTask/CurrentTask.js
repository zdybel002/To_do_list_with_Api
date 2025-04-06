import { React, useEffect, useState } from "react";
import styles from "./CurrentTask.module.css";

function CurrentTask({ idOfCategory }) {
    const [Tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [currentOrFinishe, setCurrentOrFinished] = useState(0);

    const fetchData = () => {
        fetch("http://localhost:8080/task/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: "email13@gmail.com",
                categoryId: idOfCategory, // Use idOfCategory passed from props
                completed: currentOrFinishe,
                pageNumber: 0,
                pageSize: 5,
                sortColumn: "title",
                sortDirection: "desc",
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Full response from server:", data);

                // Extract tasks from the 'content' property of the response
                const tasks = data.content;

                // Check if 'content' exists and is an array
                if (Array.isArray(tasks)) {
                    setTasks(tasks);
                    setTitle(data.content[0].category.title);
                    // console.log("Tasks from server:", tasks);
                } else {
                    console.error("Invalid response data:", data);
                }
            })
            .catch((error) => {
                console.error("Error posting data:", error);
            });
    };

    useEffect(() => {
        if (idOfCategory !== null) {
            fetchData(); // Fetch tasks when idOfCategory changes
        }
    }, [idOfCategory, currentOrFinishe]);

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
                <h3 className={styles.categoryHeading}>{title}</h3>
            </header>
            <main>
                <ul className={styles.current_list}>
                    {Tasks.map((task) => (
                        <li key={task.id} className={styles.taskLiItem}>
                            <input
                                type="checkbox"
                                className={styles.currentTaskCheckbox}
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
