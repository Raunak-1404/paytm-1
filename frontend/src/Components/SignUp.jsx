import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Axios from '../atoms/axios';
import { useRecoilValue } from 'recoil';

const SignUp = () => {
    const navigate = useNavigate();
    const axiosInstance = useRecoilValue(Axios);
    const { register, handleSubmit, reset } = useForm();

    const signUP = [
        { name: "FirstName", type: "text", backend: "firstName" },
        { name: "LastName", type: "text", backend: "lastName" },
        { name: "Email", type: "email", backend: "username" },
        { name: "Password", type: "password", backend: "password" }
    ];

    const submitHandler = async (data) => {
        try {
            const res = await axiosInstance.post('/auth/sign-up', data);
            alert("User Created Successfully");
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='bg-[#7F7F7F] w-[100vw] h-[100vh] flex justify-center items-center'>
            <div className='flex flex-col bg-white h-[70%] w-[30%] rounded-lg items-center pt-4'>
                <h1 className='text-4xl font-semibold text-black mt-2'>Sign Up</h1>
                <p className='pt-3 text-zinc-400 text-lg text-center'>Enter your information to create an account</p>

                <form onSubmit={handleSubmit(submitHandler)} className='pt-8 w-1/2 h-1/2 flex flex-col gap-5'>
                    {signUP.map((field, key) => (
                        <div key={key} className='flex flex-col gap-1 h-[40%] w-[100%]'>
                            <p className='mb-2'>{field.name}</p>
                            <input
                                type={field.type}
                                className='rounded-lg ml-1 py-2 outline-none border pl-2'
                                placeholder={field.name}
                                {...register(field.backend, { required: true })}
                            />
                        </div>
                    ))}
                    <button type="submit" className='bg-black text-white rounded-lg py-2 text-xl font-semibold'>
                        Sign Up
                    </button>

                    <div className='flex gap-2 text-lg'>
                        <p>Already have an account?</p>
                        <p onClick={() => navigate('/signin')} className='font-semibold cursor-pointer text-blue-500'>Login</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
