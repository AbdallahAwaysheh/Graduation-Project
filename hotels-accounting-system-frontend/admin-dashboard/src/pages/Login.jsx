import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { jwtDecode } from "jwt-decode";
import { form } from 'framer-motion/client';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { isAuthenticated, role, login } = useAuth(); // Add login method from context


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (isAuthenticated && role === 'accountant') {
            if (location.state?.from) {
                navigate(location.state.from);
            } else {
                navigate('/bookings');
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        }
        if (isAuthenticated && (role === 'admin' || role === 'manager')) {
            if (location.state?.from) {
                navigate(location.state.from);
            } else {
                navigate('/dashboard');
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        }
    }, [isAuthenticated, role, navigate]);


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
            const token = response.data.access_token;

            // Save the token to localStorage
            localStorage.setItem('token', token);

            // Set the Authorization header for future requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            login(token);

        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'Invalid email or password');
            } else {
                setError('Network error. Please try again later.');
            }
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 mx-auto">
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-8 border border-gray-700 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-100 mb-6 text-center">Login</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg mt-4 transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
