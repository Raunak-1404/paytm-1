import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Axios from '../atoms/axios';
import { useRecoilValue } from 'recoil';

const SignIn = () => {
    const navigate = useNavigate();
    const axiosInstance = useRecoilValue(Axios);
    const { register, handleSubmit, reset } = useForm();

    const submitHandler = async (data) => {
        try {
            const token = localStorage.getItem('token');
            console.log(token)

            const res = await axiosInstance.post('/auth/login', data, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              }
            });

            alert("User Authenticated Successfully");
            navigate('/dashboard');
        } catch (error) {
            console.error("Error signing in:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="bg-[#7F7F7F] w-full h-full min-h-screen flex justify-center items-center p-4">
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-semibold text-center text-black">Sign In</h1>
                <p className="text-center text-gray-500 mt-2">Enter your credentials to access your account</p>

                <form onSubmit={handleSubmit(submitHandler)} className="mt-8 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                            placeholder="johndoe@example.com"
                            {...register("username", { required: true })}
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                            placeholder="Password"
                            {...register("password", { required: true })}
                        />
                    </div>

                    <button type="submit" className="w-full bg-black text-white rounded-lg py-2 font-semibold text-lg mt-4">
                        Sign In
                    </button>
                    
                    <p className="text-center text-gray-600 mt-4">
                        Don't have an account? <Link to="/signup" className="text-blue-500 font-semibold ">Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
