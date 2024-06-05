import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import Home from './components/Home';
import Login from './components/Login';
import RecipeList from './components/RecipeList';
import SignUp from './components/SignUp';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // New state to track loading of auth state
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false); // Set loading to false after auth state is confirmed
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, [auth]);

  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div>Loading...</div>; // Optionally, show a loading spinner or message
    }
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/community" element={<ProtectedRoute><RecipeList /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
