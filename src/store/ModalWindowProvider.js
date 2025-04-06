import React, { useState } from "react";

// Tworzenie kontekstu
const ModalWindowContext = React.createContext();

const ModalWindowProvider = (props) => {
    const [windowIsVisible, setWindowIsVisible] = useState(false);

    const showCartHandler = () => {
        setWindowIsVisible(true);
    };

    const hideCartHandler = () => {
        setWindowIsVisible(false);
    };

    // Przekazujemy same funkcje, nie wywołujemy ich w tym miejscu
    const modalWindow = {
        windowIsVisible: windowIsVisible,
        showWindowHandler: showCartHandler,
        hideWindowHandler: hideCartHandler,
    };

    return (
        <ModalWindowContext.Provider value={modalWindow}>
            {props.children}
        </ModalWindowContext.Provider>
    );
};

export { ModalWindowProvider, ModalWindowContext };
