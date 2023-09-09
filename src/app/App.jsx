import { Routes, Route } from 'react-router-dom';
import React from 'react';
import HomePage from 'pages/homePage/HomePage';
import LoginPage from 'pages/loginPage/LoginPage';
import RegisterPage from 'pages/registerPage/RegisterPage';
import { HOMEPAGE, LOGIN, REGISTER } from 'shared/constants/PATH';

function App() {
  return (
    <Routes>
      <Route path={HOMEPAGE} element={<HomePage />} />
      <Route path={LOGIN} element={<LoginPage />} />
      <Route path={REGISTER} element={<RegisterPage />} />
    </Routes>
  );
}
export default App;
