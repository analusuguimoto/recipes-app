import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/meals" element={ <Header /> } />
    </Routes>

  );
}

export default App;
