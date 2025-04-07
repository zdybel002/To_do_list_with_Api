import styles from "./ModalInput.module.css";
import Modal from "../../UI/ModalWindow/Modal";
import React, { useState, useContext } from "react";

import { DataContext } from "../../../store/DataContext";
import { ModalWindowContext } from "../../../store/ModalWindowProvider";

const ModalInput = (props) => {
    const { addNewCategory } = useContext(DataContext);
    const modalContext = useContext(ModalWindowContext);
    const newCategoryInput = React.createRef();

    // Stan do przechowywania komunikatu o błędzie
    const [errorMessage, setErrorMessage] = useState("");

    const handleAddCategory = (e) => {
        e.preventDefault();
        console.log("Kliknięto przycisk Dodaj");

        const newCategory = {
            title: newCategoryInput.current.value,
            user: {
                id: 10027,
                email: "email3@gmail.com",
            },
        };

        if (!newCategory.title) {
            // Ustawiamy komunikat o błędzie w stanie
            setErrorMessage("Tytuł kategorii jest pusty.");
            return;
        }

        // Resetujemy komunikat o błędzie, jeśli tytuł jest poprawny
        setErrorMessage("");

        // Dodanie nowej kategorii
        addNewCategory(newCategory);
        newCategoryInput.current.value = "";
        props.onHideCart();
    };

    return (
        <Modal onHideCart={props.onHideCart}>
            <input
                ref={newCategoryInput}
                type="text"
                placeholder="Name of new Category"
                className={styles.newCategoryInput}
            />

            {/* Warunkowe renderowanie komunikatu o błędzie */}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <div className="modalWindowsBtns">
                <button onClick={handleAddCategory}>Save</button>
                <button onClick={modalContext.hideWindowHandler}>Cancel</button>
            </div>
        </Modal>
    );
};

export default ModalInput;
