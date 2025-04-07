import React, { useState } from "react";
import { TaskContext } from "./TaskContext";

const TaskProvider = ({ children }) => {
    const [categoryId, setCategoryId] = useState();
    const [categoryTitle, setCategoryTitle] = useState();
    const [taskData, setTaskData] = useState([]);

    const fetchTasks = (categoryId) => {
        fetch("http://localhost:8080/task/category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ categoryId }), // ✅ ważne!
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Full response from server:", data);
                setTaskData(data);
                const tasks = data.content;
            })
            .catch((error) => {
                console.error("Error posting data:", error);
            });
    };

    const AddNewTask = async (categoryId, categoryTitle) => {
        try {
            const response = await fetch("http://localhost:8080/task/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: categoryTitle,
                    completed: false,
                    taskDate: new Date(),
                    priority: { id: 30111 },
                    category: { id: categoryId },
                    user: { id: 10027 },
                }),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            console.log("Response from server:", data);
            fetchTasks(categoryId);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <TaskContext.Provider
            value={{
                categoryId,
                taskData,
                setCategoryId,
                categoryTitle,
                setCategoryTitle,
                fetchTasks,
                AddNewTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;
