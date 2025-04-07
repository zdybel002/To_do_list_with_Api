import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../../../store/DataContext";
import { TaskContext } from "../../../store/TaskContext";

function EditableText(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState("start");

    const { updateCategory } = useContext(DataContext); // Pobieramy dane z kontekstu
    const { setCategoryId, setCategoryTitle, fetchTasks } =
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
            updateCategory(props.id);
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
                id: props.user.id,
            },
        });
        props.onHandleClick(false);
    };

    const takeCategoryID = () => {
        setCategoryId(props.id);
        setCategoryTitle(props.title);
        fetchTasks(props.id);
        console.log("Category ID ", props.id);
    };

    return (
        <div>
            {isEditing ? (
                <input
                    type="text"
                    value={text}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    autoFocus
                />
            ) : (
                <div
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
