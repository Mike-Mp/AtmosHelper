
import { useContext } from 'react';
import { ThemeContext } from '../components/ThemeProvider';

export default function Settings() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className="app__body">
            <header className="app__header">
                <h1>Settings</h1>
            </header>
            
            <label>Theme: </label>
            <select className="select" onChange={toggleTheme}>
                <option value={"light"} selected={theme === "light"}>Light</option>
                <option value={"dark"} selected={theme === "dark"}>Dark</option>
            </select>
        </div>
    )
}