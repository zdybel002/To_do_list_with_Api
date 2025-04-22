import React, { useContext, useState } from "react";

// Tworzenie kontekstu
const ProfileWindowContext = React.createContext();

const ProfileWindowProvider = ({ children }) => {
    const [windowIsVisible, setWindowIsVisible] = useState(false);

    const showProfileWindow = () => {
        setWindowIsVisible(true);
        fetchStat();
    };

    const hideProfileWindow = () => {
        setWindowIsVisible(false);
    };

    const [dateOfProfile, setDateOfProfile] = useState({});
    const fetchStat = async () => {
        try {
            const response = await fetch("http://localhost:8080/stat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: localStorage.getItem("email"),
            });

            if (!response.ok) {
                throw new Error(`Błąd serwera: ${response.status}`);
            }

            const stats = await response.json();
            console.log("Statystyki z serwera:", stats);
            setDateOfProfile(stats);
            // Możesz np. zapisać do stanu:
            // setStats(stats);
        } catch (error) {
            console.error("Błąd podczas pobierania statystyk:", error);
        }
    };
    const contextValue = {
        windowIsVisible,
        showProfileWindow,
        hideProfileWindow,
        dateOfProfile,
    };

    return (
        <ProfileWindowContext.Provider value={contextValue}>
            {children}
        </ProfileWindowContext.Provider>
    );
};

export { ProfileWindowProvider, ProfileWindowContext };
