import { useEffect, useState } from "react";

import CategoryItem from "../CategoryItem/CategoryItem";

import styles from "./Categories.module.css";

const Categories = (props) => {
    const [categoriesData, setCategoriesData] = useState([]);

    useEffect(() => {
        const postData = "email3@gmail.com";

        fetch("http://localhost:8080/category/all", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: postData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    setCategoriesData(data);
                    console.log("Response from server:", data);
                } else {
                    console.warn("Unexpected response:", data);
                }
            })
            .catch((error) => {
                console.error("Error posting data:", error);
            });
    }, []);

    const showTaskHandler = (event) => {
        props.onAddCurrentTasks(event.target.id);
    };

    return (
        <ul className={styles.categories_list}>
            {categoriesData.map((item) => (
                <CategoryItem
                    id={item.id}
                    key={item.id}
                    className={styles.categories_list_item}
                    onShowTaskHandler={showTaskHandler}
                    title={item.title}
                />
            ))}
        </ul>
    );
};

export default Categories;
