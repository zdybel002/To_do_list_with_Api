import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { ModalWindowProvider } from "./store/ModalWindowProvider";
import LoginProvider from "./store/LoginProvider";
ReactDOM.render(
    <LoginProvider>
        <ModalWindowProvider>
            <App />
        </ModalWindowProvider>
    </LoginProvider>,
    document.getElementById("root")
);
