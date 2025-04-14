import React from 'react';
import './App.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Topbar from './components/topbar/Topbar.jsx'
import Menu from './components/menu/Menu.jsx'

import { useState } from "react";
import Intro from './components/intro/Intro.jsx';

const NotFound = () => <h1>404 - Page Not Found</h1>;

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <Router>
      <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className='content'>
        <Routes>
          <Route path="/" element={<Intro />} />
          
          <Route path="*" element={<NotFound />} />  {/* Catch-all for 404 */}
        </Routes>
      </div>

    </Router>
  );
};

export default App;
