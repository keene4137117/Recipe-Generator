import React, { useState } from 'react';
import { signUp } from '../auth'; // Make sure this import correctly points to your Firebase auth functions

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      setError('Passwords do not match');
      return;
    }
    try {
      setLoading(true);
      await signUp(email, password1);
      window.location.href = '/'; // Redirect to the home page on successful signup
    } catch (error) {
      setError(error.message); // Handle errors from Firebase
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-900">Sign Up</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSignUp} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password1" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password1"
              type="password"
              required
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password2" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              id="password2"
              type="password"
              required
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button type="submit" disabled={loading} className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-50' : ''}`}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
            <p className="mt-6 text-center text-gray-600">
            Have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
           </p>
        </form>
      </div>
    </div>
  );
}
