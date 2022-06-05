import { useState, createContext } from 'react';

export const ThemeContext = createContext({});

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState("dark");
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const color = theme === "light" ? "#212229" : "#FFF";
    const backgroundColor = theme === "light" ? "#FFF" : "#212229";

    document.body.style.color = color;
    document.body.style.backgroundColor = backgroundColor;

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )

}