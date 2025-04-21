import styles from "./ModalInput.module.css";
import Modal from "../../UI/ModalWindow/Modal";
import React, { useState, useContext } from "react";

import { CategoryContext } from "../../../store/CategoryContext";
import { ModalWindowContext } from "../../../store/ModalWindowProvider";
import { LoginContext } from "../../../store/LoginProvider";

const ModalInput = (props) => {
    const { addNewCategory } = useContext(CategoryContext);
    const { email } = useContext(LoginContext);
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
                id: localStorage.getItem("userId"),
                email: localStorage.getItem("email"),
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
