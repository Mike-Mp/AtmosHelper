import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Ohms from "./pages/Ohms";
import Storage from "./pages/Storage";
import StorageItem from "./pages/StorageItem";

import { useContext } from 'react';
import { ThemeContext } from './components/ThemeProvider';

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`app app--${theme}`}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" exact element={
            <Navigate replace to="/home"/>
          } />
          <Route path="/home" element={<Home />} />
          <Route path="/settings" exact element={<Settings />} />
          <Route path="/storage">
            <Route path="/storage:page_number" exact element={<Storage />} />
            <Route path="/storage/add" exact element={<StorageItem />} />
            <Route path="/storage/edit/:item_id" exact element={<StorageItem />} />
          </Route>
          <Route path="/about" exact element={<About />} />
          <Route path="/ohm" exact element={<Ohms />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
