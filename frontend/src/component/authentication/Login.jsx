import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../store/authSlice' 
import Input from './Input'
import { useDispatch } from 'react-redux'
import RouteInput from "../findroute/RouteInput";
import { useForm } from 'react-hook-form'

function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const loginAccount = async (data) => {
        console.log(data)
        const response = await fetch('http://localhost:8000/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('authToken', data.token)
            // onLogin(data.token); // Call the onLogin prop with the received token
            console.log('Login Successful:', data);
            dispatch(login(data))
            navigate("/")
        } else {
            const errorData = await response.json();
            console.error('Login Failed:', errorData);
        }
    }


    return (
        <div className='bg-[#f7f7f7] pt-36 pb-16'>
            <div className='flex items-center justify-center w-full py-10'>
                <div className={`mx-auto w-full max-w-lg bg-[#F1F1F2] rounded-xl p-10 border border-black/10`}>
                    <h2 className="text-center text-2xl font-bold leading-tight text-black">Sign in to your account</h2>
                <form onSubmit={handleSubmit(loginAccount)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input 
                            label="Email : "
                            placeholder="Enter your email"
                            type="text"
                            className=""
                            {...register("username", {
                                required: true,
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
                        <button type="submit" className="w-full text-white px-4 py-2 rounded-lg bg-[#18BED4] hover:bg-[#15a8bc]">
                                Sign in
                            </button>
                        </div>
                    </form>
                    <p className="mt-2 text-center text-base text-black/60">
                        {/* &apos; and &nbsp; are HTML Character Entities */}
                        Don&apos;t have any account?&nbsp;
                        <Link to="/signup" className="font-medium text-primary transition-all duration-200 hover:underline">
                            Sign Up
                        </Link>
                    </p>
            </div>
        </div>
        <RouteInput/>
    </div>
    )
}

export default Login