import React, { useState, useContext } from "react";
import CategoryItemMenu from "../CategoryMenu/CategoryItemMenu";
import EditableText from "./EditableText";

import { DataContext } from "../../../store/DataContext";

import styles from "./CategoryItem.module.css";

const CategoryItem = (props) => {
    const { removeCategory } = useContext(DataContext); // Pobieramy dane z kontekstu

    const [showMenu, setShowMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

    const handleRightClick = (event) => {
        event.preventDefault(); // Zapobiega domyślnemu menu kontekstowemu
        setShowMenu(true);

        // Ustawienie pozycji menu w miejscu kliknięcia
        setMenuPosition({
            x: event.clientX,
            y: event.clientY,
        });
    };

    // Nasłuchiwanie kliknięć poza menu
    const handleClickOutside = (event) => {
        if (showMenu && !event.target.closest(".context-menu")) {
            setShowMenu(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [showMenu]);

    // Edit Category
    const [clicked, setClicked] = useState(false);

    const handleEdit = () => {
        setClicked(true);

        setShowMenu(false);
    };
    const handelClick = () => {
        setClicked(false);
    };

    //Delete category

    const handleDelete = () => {
        // const confirmed = window.confirm("Na pewno chcesz usunąć?");
        // if (confirmed) {
        //     alert("Element usunięty!");
        // }
        removeCategory(props.id);
        setShowMenu(false);
    };

    return (
        <>
            <EditableText
                user={props.user}
                id={props.id}
                onContextMenu={handleRightClick}
                clicked={clicked}
                onHandleClick={handelClick}
                className={styles.CategoryNameItem}
                title={props.title}
            />

            {showMenu && (
                <CategoryItemMenu
                    position={menuPosition}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </>
    );
};
export default CategoryItem;
