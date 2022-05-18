import { useState } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
        <BrowserRouter>
              <Nav />
            <Routes>
              <Route  path="/" exact element={<Home />}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
