import React, { useState, useEffect } from "react";
// import fetchUpdateTask from "../../../Request/UpdateTask";

function EditableText(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState("start");

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
            console.log("MY REquest ", props.id);
            console.log("MY user ", props.user.id);
        }
    };

    return (
        <div>
            {isEditing ? (
                <input
                    type="text"
                    value={text}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            ) : (
                <div
                    id={props.id}
                    onClick={props.onShowTaskHandler}
                    onContextMenu={props.onContextMenu}
                >
                    {props.title}
                </div>
            )}
        </div>
    );
}

export default EditableText;
