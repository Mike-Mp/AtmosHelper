import { useState } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Settings from './pages/Settings';
import About from './pages/About';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
        <BrowserRouter>
              <Nav />
            <Routes>
              <Route  path="/" exact element={<Home />}/>
              <Route  path="/settings" exact element={<Settings />}/>
              <Route  path="/about" exact element={<About />}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
