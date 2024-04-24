import React from 'react';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import Plot from './pages/plotter';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

const App = () => {

  const checkLogin = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:8000/authenticate', token);
      if (!response.success){
        alert("User Not Logged In")
        return false;
      }
      else {
        return true;
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage></LoginPage>} />
            <Route path="/signup" element={<SignupPage></SignupPage>} />
            <Route path='/plotter' element={<Plot checkLogin></Plot>} />
          </Routes>
        </Router>
      </div>
  );
};

export default App;
