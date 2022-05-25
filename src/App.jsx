import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Ohms from "./pages/Ohms";
import Storage from "./pages/Storage";
import AddNewStorageItem from "./pages/AddNewStorageItem";

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
            {/* <Route path="/storage:page_number?brand" element={<Storage />} /> */}
          </Route>
          <Route path="/addnewstorageitem" element={<AddNewStorageItem />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/ohm" exact element={<Ohms />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
