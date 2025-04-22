import React, { useState, useEffect, useContext } from "react";
import { CategoryContext } from "../../../store/CategoryContext";
import { TaskContext } from "../../../store/TaskContext";

import styles from "./EditableText.module.css";

function EditableText(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState("start");

    const { updateCategory } = useContext(CategoryContext); // Pobieramy dane z kontekstu
    const { setCategoryId, setCategoryTitle, fetchTasks, taskStatus } =
        useContext(TaskContext);

    useEffect(() => {
        console.log("Use effect ", props.clicked);
        setIsEditing(props.clicked); // Zmieniamy stan dziecka na wartość z props
        setText(props.title);
    }, [props.clicked]);

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setIsEditing(false); // Zatwierdź zmianę
            // fetchUpdateTask(props.id, text, props.user.id);
            updateCategory({
                id: props.id,
                title: text,
                user: {
                    id: localStorage.getItem("userId"),
                },
            });
            props.onHandleClick(false);
        }
    };

    const handleBlur = () => {
        setIsEditing(false); // Zatwierdź zmianę
        // fetchUpdateTask(props.id, text, props.user.id);
        updateCategory({
            id: props.id,
            title: text,
            user: {
                id: localStorage.getItem("userId"),
            },
        });
        props.onHandleClick(false);
    };

    const takeCategoryID = () => {
        setCategoryId(props.id);
        setCategoryTitle(props.title);
        fetchTasks(props.id, taskStatus);
        console.log("Category ID ", props.id);
    };

    return (
        <div className={styles.categoryItemWrapper}>
            {isEditing ? (
                <input
                    type="text"
                    value={text}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    autoFocus
                    className={styles.categoryInput}
                />
            ) : (
                <div
                    className={styles.categoryDisplay}
                    onClick={takeCategoryID}
                    onContextMenu={props.onContextMenu}
                >
                    {props.title}
                </div>
            )}
        </div>
    );
}

export default EditableText;
