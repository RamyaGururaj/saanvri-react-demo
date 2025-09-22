import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Tracker from './Pages/Tracker';
import Remedies from './Pages/Remedies';
import Recipies from './Pages/Recipies';
import Games from './Pages/Games';
import Feelitout from './Pages/Feelitout';
import Community from './Pages/Community';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Userdetails from './Pages/Userdetails';
import HealthChecker from './Pages/HealthChecker';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/Userdetails' element={<Userdetails/>} />
        <Route path='/HealthChecker' element={<HealthChecker/>} />
        <Route path='/Home' element={<Home/>} />
        <Route path='/Tracker' element={<Tracker/>} />
        <Route path='/Remedies' element={<Remedies/>} />
        <Route path='/Recipies' element={<Recipies/>} />
        <Route path='/Games' element={<Games/>} />
        <Route path='/Feelitout' element={<Feelitout/>} />
        <Route path='/Community' element={<Community/>} />
      </Routes>
    </div>
  );
}

export default App;
