import Login from "./components/Login/Login";
import Tasks from "./components/main/Main";
import MainHeader from "./components/UI/Header/MainHeader";
import React, { useContext } from "react";

import CategoryProvider from "./store/CategoryProvider";
import ModalInput from "./components/Categories/NewCategory/ModalInput";
import { ModalWindowContext } from "./store/ModalWindowProvider";
import { ProfileWindowContext } from "./store/ProfileWindowProvider";
import Profile from "./components/Login/Profile";
import { LoginContext } from "./store/LoginProvider";

import "./App.css";

function App() {
    const modalContext = useContext(ModalWindowContext);
    const provileWindow = useContext(ProfileWindowContext);
    const { isLoggedIn } = useContext(LoginContext);

    return (
        <div>
            <CategoryProvider>
                <MainHeader />

                <main>
                    {!isLoggedIn && <Login />}

                    {modalContext.windowIsVisible && (
                        <ModalInput
                            onHideCart={modalContext.hideWindowHandler}
                        />
                    )}

                    {provileWindow.windowIsVisible && <Profile />}

                    {isLoggedIn && <Tasks />}
                </main>
            </CategoryProvider>
        </div>
    );
}

export default App;
