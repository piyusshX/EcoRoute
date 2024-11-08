import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Input from './Input'
import { useDispatch } from 'react-redux'
import { login } from '../../store/authSlice' 

function Signup() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const createAccount = async(data) => {
        const response = await fetch('http://localhost:8000/api/register/', {  // DRF API URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Registration Successful:', data);
            localStorage.setItem('authToken', data.token)
            dispatch(login(data))
            navigate("/")
        } else {
            const errorData = await response.json();
            console.error('Registration Failed:', errorData);
        }
    }

    return (

        <div className='bg-[#f7f7f7] pt-36 pb-16'>
           <div className="flex items-center justify-center">
                <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                    <h2 className="text-center text-2xl font-bold leading-tight text-black">Sign up to create account</h2>

                    <form onSubmit={handleSubmit(createAccount)} className='mt-8'>
                        <div className='space-y-5'>
                            <Input 
                                label="Username : "
                                placeholder="Enter your username"
                                type="username"
                                {...register("username", {
                                    required: true,
                                })}
                            />
                            <Input 
                                label="Email : "
                                placeholder="Enter your email"
                                type="email"
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        // the given expression below is a regExp. In this case it is used for validating
                                        // the entered email -> https://regexr.com/ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
                                        matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || <p className='text-red-500 text-sm'>Email address must be a valid address</p>,
                                    }
                                })} 
                            />
                            <Input 
                                label="Password : "
                                placeholder="Enter your password"
                                type="password"
                                {...register("password", {
                                    required: true,
                                })}
                            />
                            <button type="submit" className="w-full px-4 py-2 text-white rounded-lg bg-[#18BED4] hover:bg-[#15a8bc]">
                                    Sign up
                            </button>
                        </div>
                    </form>
                    <p className="mt-2 text-center text-base text-black/60">
                        Already have an account?&nbsp;
                        <Link to="/login" className="font-medium text-primary transition-all duration-200 hover:underline" >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup