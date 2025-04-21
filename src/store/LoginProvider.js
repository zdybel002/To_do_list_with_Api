import React, { useState, createContext } from "react";

export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
    const [email, setEmail] = useState(""); // Zmieniamy na pusty string
    const [userName, setUserName] = useState(""); // Zmieniamy na pusty string

    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLoggedIn") === "1"
    );
    const [loginError, setLoginError] = useState(null);

    const loginHandler = (email, userId) => {
        localStorage.setItem("isLoggedIn", "1");

        setIsLoggedIn(true);
        setLoginError(null); // Resetujemy błąd po udanym logowaniu
        localStorage.setItem("email", email);
        localStorage.setItem("userId", userId);
    };

    const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("email");
        localStorage.removeItem("userId");
        setIsLoggedIn(false);
        setEmail(""); // Czyszczymy email po wylogowaniu
        setUserName(""); // Czyszczymy username po wylogowaniu
    };

    const checkLogin = async (email, password) => {
        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error(`Błąd logowania (${response.status})`);
            }

            // Pobieramy username z odpowiedzi
            const userNameFromResponse = await response.text();

            // Ustawiamy email i username w stanie
            setEmail(email);
            setUserName(userNameFromResponse);

            loginHandler(email, userNameFromResponse); // Zmieniamy stan na zalogowany
        } catch (error) {
            console.error("Logowanie nieudane:", error.message);
            logoutHandler(); // Resetujemy stan przy błędzie logowania
            setLoginError("Wrong email or password");
        }
    };

    return (
        <LoginContext.Provider
            value={{
                isLoggedIn,
                email,
                userName,
                checkLogin,
                loginHandler,
                logoutHandler,
                loginError,
            }}
        >
            {children}
        </LoginContext.Provider>
    );
};

export default LoginProvider;
