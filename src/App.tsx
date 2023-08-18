import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="meals">
      <span className="logo">TRYBEATS</span>
      <Routes>
        <Route path="/" element={ <Login /> } />
      </Routes>
    </div>
  );
}

export default App;
