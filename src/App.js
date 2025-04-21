import Login from "./components/Login/Login";
import Tasks from "./components/main/Main";
import MainHeader from "./components/UI/Header/MainHeader";
import React, { useEffect, useContext, useState } from "react";

import CategoryProvider from "./store/CategoryProvider";
import ModalInput from "./components/Categories/NewCategory/ModalInput";
import { ModalWindowContext } from "./store/ModalWindowProvider";
import { LoginContext } from "./store/LoginProvider";

import "./App.css";

function App() {
    const modalContext = useContext(ModalWindowContext);
    const { isLoggedIn } = useContext(LoginContext);

    return (
        <div>
            <CategoryProvider>
                <MainHeader />
                <main>
                    {!isLoggedIn && <Login />}
                    {/* Pokazanie koszyka, jeśli modal jest widoczny */}{" "}
                    {modalContext.windowIsVisible && (
                        <ModalInput
                            onHideCart={modalContext.hideWindowHandler}
                        />
                    )}
                    {isLoggedIn && <Tasks />}
                </main>
            </CategoryProvider>
        </div>
    );
}

export default App;
