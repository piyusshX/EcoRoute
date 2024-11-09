import React from 'react'
import RouteInput from './RouteInput'
import { useForm } from 'react-hook-form'
import { MapPinCheck, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function FindRoute() {
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()
    // const handleSearchClick() => {

    // }

    
    const deliveryLocation = async (data) => {
        const response = await fetch('http://localhost:8000/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data
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
    <div className='px-20 pt-36 pb-28 w-[100%] flex justify-center items-start'>
        <div className='mx-auto bg-gray-100 rounded-xl px-2 py-2 border border-black/10'>
        <h2 className="text-center text-2xl flex justify-center pt-6 font-bold leading-tight text-black"><MapPinCheck className='text-[#18BED4] mr-2'/> Route Finder</h2>
        <div className=''>
            <form onSubmit={handleSubmit(deliveryLocation)} className='mt-8'>
                <div className='space-y-2 w-[600px] py-4 px-5 rounded-xl'>
                        <div className='flex gap-2 w-full'>
                            <RouteInput
                                label=""
                                placeholder="Enter delivery location"
                                type="text"
                                className=""
                                {...register("delivery", {
                                    required: true,
                                })} 
                            />
                            <button  className="py-2 pr-4 pl-3  font-semibold bg-[#18BED4] text-white hover:bg-[#15a8bc] hover:scale-[1.02] transition-all duration-200 rounded-lg flex">
                            {/* onClick={handleSearchClick} */}
                                <Search className="mr-2 w-7"/>
                                Search
                            </button>
                        </div>
                        <div className="w-full sm:col-span-3 text-start">
                            <label
                            htmlFor={`Latitude`}
                            className="block text-sm font-medium text-gray-700 mb-1"
                            >
                            Latitude
                            </label>
                            <input
                            type="number"
                            id={`Latitude`}
                            readOnly
                            className="w-full px-3 py-2 border text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                            placeholder="0"
                            />
                        </div>
                        <div className="w-full sm:col-span-3 text-start">
                            <label
                            htmlFor={`Longitudex`}
                            className="block text-sm font-medium text-gray-700 mb-1"
                            >
                            Longitude
                            </label>
                            <input
                            readOnly
                            type="number"
                            id={`Longitudex`}
                            className="w-full px-3 py-2 border text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                            placeholder="0"
                            />
                        </div>
                        <button type="submit" className="w-full text-white px-4 py-2 rounded-lg bg-[#18BED4] hover:bg-[#15a8bc]">
                                Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default FindRoute