import React from 'react';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {

  return (
      <div>
        <Router>
        <Routes>
          <Route path="/" element={<LoginPage></LoginPage>} />
          <Route path="/signup" element={<SignupPage></SignupPage>} />
        </Routes>
        </Router>
      </div>
  );
};

export default App;
