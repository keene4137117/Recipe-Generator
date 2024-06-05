import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Paper, Grid } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config.js';
import { signIn } from '../auth.js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';  // Make sure this is set to listen to auth state changes

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const currentUser = useAuth();  // This should update on auth state change
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentUser) {
      navigate('/');  // Redirect when currentUser is set
    }
  }, [currentUser, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await signIn(email, password);
      console.log("Logic successful")
      // Navigation is now handled by useEffect based on currentUser state
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.message);  // Display error message if needed
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-10 py-8 bg-white rounded-lg shadow-xl">
        <div className="mb-6 text-3xl font-light text-center text-gray-800">
          Sign In
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="text-sm font-bold text-gray-600 block">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-bold text-gray-600 block">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full block bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-4 py-3 mt-6 focus:outline-none"
          >
            Log in
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Don’t have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}
