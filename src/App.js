import Login from "./components/Login/Login";
import Tasks from "./components/AllTasks/Tasks/Tasks";
import MainHeader from "./components/UI/Header/MainHeader";
import React, { useEffect, useContext, useState } from "react";

import ModalInput from "./components/Categories/NewCategory/ModalInput";
import { ModalWindowContext } from "./store/ModalWindowProvider";

import "./App.css";

function App() {
    const modalContext = useContext(ModalWindowContext);

    // const ctx = useContext(AuthContext);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedLoginInfo = localStorage.getItem("isLoggedIn");

        if (storedLoginInfo === "1") {
            setIsLoggedIn(true);
        }
    }, []);

    const loginHandlee = (email, password) => {
        localStorage.setItem("isLoggedIn", "1");
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    };

    return (
        <div>
            <MainHeader isAutherticated={isLoggedIn} onLogout={logoutHandler} />
            <main>
                {!isLoggedIn && <Login onLogin={loginHandlee} />}
                {/* Pokazanie koszyka, jeśli modal jest widoczny */}{" "}
                {modalContext.windowIsVisible && (
                    <ModalInput onHideCart={modalContext.hideWindowHandler} />
                )}
                {isLoggedIn && <Tasks />}
            </main>
        </div>
    );
}

export default App;
