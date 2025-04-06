import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { AuthContexProvider } from "./store/auth-contex";
import { ModalWindowProvider } from "./store/ModalWindowProvider";

ReactDOM.render(
    <AuthContexProvider>
        <ModalWindowProvider>
            <App />
        </ModalWindowProvider>
    </AuthContexProvider>,
    document.getElementById("root")
);
