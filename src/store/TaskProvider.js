import React, { useState } from "react";
import { TaskContext } from "./TaskContext";

const TaskProvider = ({ children }) => {
    const [categoryId, setCategoryId] = useState();
    const [categoryTitle, setCategoryTitle] = useState();
    const [taskData, setTaskData] = useState([]);

    const [taskStatus, setTaskStatus] = useState(0);

    const handleChangeStatus = (event) => {
        const newStatus = event === "current" ? 0 : 1;
        setTaskStatus(newStatus);
        fetchTasks(categoryId, newStatus);
    };

    const fetchTasks = async (categoryId, status) => {
        try {
            const response = await fetch("http://localhost:8080/task/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: localStorage.getItem("email"),
                    categoryId: categoryId,
                    pageNumber: 0,
                    completed: status,
                    pageSize: 100,
                    sortColumn: "taskDate",
                    sortDirection: "asc",
                }),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            console.log("Response from server FetchTasks: ", data);
            setTaskData(data.content);
        } catch (error) {
            console.error("Error:", error);
        }
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
                    category: {
                        id: categoryId,
                    },
                    user: {
                        id: localStorage.getItem("userId"),
                    },
                }),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            console.log("Response from server UPDATE:", data);
            fetchTasks(categoryId);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const deleteTask = async (taskID) => {
        try {
            const response = await fetch(
                `http://localhost:8080/task/delete/${taskID}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            fetchTasks(categoryId, taskStatus);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const updateTask = async (taskID, categoryTitle) => {
        const task = taskData.find((t) => t.id === taskID);
        console.log("result TASK", task);
        const updatedTask = {
            ...task,
            title: categoryTitle, // <- tylko to zmieniasz
            user: {
                id: Number(localStorage.getItem("userId")),
            },
        };
        console.log("UpdateTask", updatedTask);

        try {
            const response = await fetch("http://localhost:8080/task/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTask),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            fetchTasks(categoryId, taskStatus);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const updateTaskStatus = async (taskID) => {
        const task = taskData.find((t) => t.id === taskID);
        console.log("result TASK", task);
        const updatedTask = {
            ...task,
            completed: true,
            user: {
                id: Number(localStorage.getItem("userId")),
            },
        };
        console.log("UpdateTask", updatedTask);

        try {
            const response = await fetch("http://localhost:8080/task/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTask),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            fetchTasks(categoryId, taskStatus);
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
                deleteTask,
                updateTask,
                updateTaskStatus,
                taskStatus,
                handleChangeStatus,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;
