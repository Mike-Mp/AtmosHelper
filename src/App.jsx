import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Ohms from "./pages/Ohms";
import Storage from "./pages/Storage";
import StorageItem from "./pages/StorageItem";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/settings" exact element={<Settings />} />
          <Route path="/storage">
            <Route path="/storage:page_number" element={<Storage />} />
            <Route path="/storage/add" element={<StorageItem />} />
            <Route path="/storage/edit/:item_id" element={<StorageItem />} />
          </Route>
          <Route path="/about" exact element={<About />} />
          <Route path="/ohm" exact element={<Ohms />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
