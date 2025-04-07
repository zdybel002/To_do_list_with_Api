import React, { useState } from "react";
import { DataContext } from "./DataContext";

const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async (url, options) => {
        setLoading(true);
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Błąd serwera: ${response.status}`);
            }
            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Błąd podczas fetch:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const fetchAllCategories = async () => {
        try {
            const categories = await fetchData(
                "http://localhost:8080/category/all",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: "email3@gmail.com",
                }
            );

            if (Array.isArray(categories)) {
                setData(categories);
                console.log("Odpowiedź z serwera:", categories);
            } else {
                console.warn("Niespodziewana odpowiedź:", categories);
            }
        } catch (error) {
            console.error("Błąd podczas pobierania danych:", error);
        }
        setLoading(false);
    };

    const addNewCategory = async (newCategory) => {
        try {
            const response = await fetch("http://localhost:8080/category/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCategory),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            fetchAllCategories();
            const data = await response.json();
            console.log("Odpowiedź z serwera:", data);
        } catch (error) {
            console.error("Wystąpił błąd przy fetchu:", error.message);
        }
    };

    const updateCategory = async (newCategory) => {
        try {
            if (!newCategory || typeof newCategory !== "object") {
                throw new Error("Niepoprawne dane wejściowe (newCategory)");
            }

            const response = await fetch(
                "http://localhost:8080/category/update",
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newCategory),
                }
            );

            if (!response.ok) {
                throw new Error(`Błąd serwera: ${response.status}`);
            }

            // Sprawdzanie, czy odpowiedź zawiera dane
            const responseText = await response.text();
            if (responseText) {
                const data = JSON.parse(responseText); // Parsujemy tylko, jeśli odpowiedź nie jest pusta
                console.log("Odpowiedź z serwera:", data);
            } else {
                console.log("Serwer zwrócił pustą odpowiedź.");
            }
            fetchAllCategories();
        } catch (error) {
            console.error("Wystąpił błąd przy fetchu:", error.message);
        }
    };

    const removeCategory = async (categoryId) => {
        try {
            const response = await fetch(
                `http://localhost:8080/category/delete/${categoryId}`,
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (!response.ok) {
                throw new Error(`Błąd serwera: ${response.status}`);
            }

            // Sprawdzanie, czy odpowiedź zawiera dane
            const responseText = await response.text();
            if (responseText) {
                const data = JSON.parse(responseText); // Parsujemy tylko, jeśli odpowiedź nie jest pusta
                console.log("Odpowiedź z serwera:", data);
            } else {
                console.log("Serwer zwrócił pustą odpowiedź.");
            }
            fetchAllCategories();
        } catch (error) {
            console.error("Wystąpił błąd przy fetchu:", error.message);
        }
    };

    return (
        <DataContext.Provider
            value={{
                data,
                loading,
                fetchAllCategories,
                addNewCategory,
                updateCategory,
                removeCategory,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
