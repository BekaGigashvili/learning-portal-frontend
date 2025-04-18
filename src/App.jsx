import React from 'react';
import './App.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Topbar from './components/topbar/Topbar.jsx'
import Menu from './components/menu/Menu.jsx'
import Login from './components/login/Login.jsx'
import { useState } from "react";
import Intro from './components/intro/Intro.jsx';
import Register from './components/registration/Register.jsx';
import Profile from './components/profile/Profile.jsx';
import SearchResults from './components/search/SearchResults.jsx'
import CourseDetail from './components/courseDetails/CourseDetail.jsx'

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
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          
          <Route path="*" element={<NotFound />} />  {/* Catch-all for 404 */}
        </Routes>
      </div>

    </Router>
  );
};

export default App;
