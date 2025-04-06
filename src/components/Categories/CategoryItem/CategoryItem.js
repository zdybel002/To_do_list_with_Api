import React, { useState } from "react";
import ContextMenu from "../CategoryMenu/CategoryItemMenu";

import styles from "./CategoryItem.module.css";

const CategoryItem = (props) => {
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
    const handleEdit = () => {
        alert("Edytujesz element!");
        setShowMenu(false);
    };

    const handleDelete = () => {
        const confirmed = window.confirm("Na pewno chcesz usunąć?");
        if (confirmed) {
            alert("Element usunięty!");
        }
        setShowMenu(false);
    };

    const handleCloseMenu = () => {
        setShowMenu(false);
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

    return (
        <>
            <div
                id={props.id}
                onClick={props.onShowTaskHandler}
                onContextMenu={handleRightClick}
                className={styles.CategoryNameItem}
            >
                {props.title}
            </div>
            {showMenu && (
                <ContextMenu
                    position={menuPosition}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onClose={handleCloseMenu}
                />
            )}
        </>
    );
};
export default CategoryItem;
