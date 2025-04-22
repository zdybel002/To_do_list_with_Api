import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { ModalWindowProvider } from "./store/ModalWindowProvider";
import LoginProvider from "./store/LoginProvider";
import { ProfileWindowProvider } from "./store/ProfileWindowProvider";
ReactDOM.render(
    <LoginProvider>
        <ProfileWindowProvider>
            <ModalWindowProvider>
                <App />
            </ModalWindowProvider>
        </ProfileWindowProvider>
    </LoginProvider>,
    document.getElementById("root")
);
