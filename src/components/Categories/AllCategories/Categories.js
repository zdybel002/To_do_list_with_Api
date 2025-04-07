import { useEffect, useContext } from "react";
import CategoryItem from "../CategoryItem/CategoryItem";
import { DataContext } from "../../../store/DataContext";
import styles from "./Categories.module.css";

const Categories = (props) => {
    const { data, fetchAllCategories } = useContext(DataContext); // Pobieramy dane z kontekstu

    useEffect(() => {
        fetchAllCategories(); // Pobieramy dane po załadowaniu komponentu
    }, []); // Pusta tablica oznacza, że efekt wykona się tylko raz, po montowaniu komponentu

    return (
        <ul className={styles.categories_list}>
            <>
                {console.log("Categories ", data)}
                {data.map((item) => (
                    <CategoryItem
                        user={item.user}
                        id={item.id}
                        key={item.id}
                        className={styles.categories_list_item}
                        title={item.title}
                    />
                ))}
            </>
        </ul>
    );
};

export default Categories;
