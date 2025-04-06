import styles from "./ModalInput.module.css";
import Modal from "../../UI/ModalWindow/Modal";
import React from "react";

const ModalInput = (props) => {
    const newCategoryInput = React.createRef();

    const fetchData = () => {
        fetch("http://localhost:8080/category/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: `${newCategoryInput.current.value}`,
                user: {
                    id: 10027,
                    email: "email3@gmail.com",
                },
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
            })
            .catch((error) => {
                console.error("Error posting data:", error);
            });

        newCategoryInput.current.value = "";
    };

    return (
        <Modal onHideCart={props.onHideCart}>
            <input
                ref={newCategoryInput}
                type="text"
                placeholder="Name of new Category"
                className={styles.newCategoryInput}
            />
            <div className="modalWindowsBtns">
                <button onClick={fetchData}>Save</button>
                <button>Cancel</button>
            </div>
        </Modal>
    );
};

export default ModalInput;
