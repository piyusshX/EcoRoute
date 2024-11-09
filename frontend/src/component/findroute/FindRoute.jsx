import React from 'react'
import { useState } from 'react'
import RouteInput from './RouteInput'
import { useForm } from 'react-hook-form'
import { MapPinCheck, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Select from './Select'

function FindRoute() {
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()
    const [option, setOption] = useState("");
    const vehicle = ["Bicycle", "Car", "Motorcycle", "Scooter", "Truck"]
    const mode = ["short", "eco", "fast", "balanced"]
    const lng = 0
    const lat = 0


    const handleSearchClick = async (data) => {
        const response = await fetch('http://localhost:8000/api/place/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('deliveryCords', data)
            console.log('delivery coordinated fetched:', data);
            lat = data.latitude
            lng = data.longitude
        }
    }

    
    const deliveryLocation = async (data) => {
        
        const params = {
            agent_location: {"lat" : localStorage.getItem.lat, "lng" : localStorage.getItem.lng},
            delivery_location: {"lat" : localStorage.getItem.deliveryCords.lat, "lng" : localStorage.getItem.deliveryCords.lng},
            vehicle_type: data.vehicle,
            speed: data.mode,
            isEV: data.isEV,
        };
        
        const response = await fetch('http://localhost:8000/api/find-route/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
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
                <div className='space-y-2 w-[600px] py-4 px-5 rounded-xl  mt-8'>
                        <div className=' w-full'>
                            <form onSubmit={handleSubmit(handleSearchClick)} className='flex gap-2'>
                                <RouteInput
                                    label=""
                                    placeholder="Enter delivery location"
                                    type="text"
                                    className=""
                                    {...register("delivery", {
                                        required: true,
                                    })} 
                                />
                                <button type="submit"  className="py-2 pr-4 pl-3  font-semibold bg-[#18BED4] text-white hover:bg-[#15a8bc] hover:scale-[1.02] transition-all duration-200 rounded-lg flex">
                                {/* onClick={handleSearchClick} */}
                                    <Search className="mr-2 w-7"/>
                                    Search
                                </button>
                            </form>
                        </div>
                        <form onSubmit={handleSubmit(deliveryLocation)} className=''>
                        <div className='gird grid-cols-2 gap-2 w-full'>
                            <div className='col-span-1'>
                                <Select 
                                    options={vehicle}
                                    label="Vehicle type"
                                    placeholder="Select vehicle type"
                                    className=""
                                    option
                                    setOption={setOption}
                                    {...register("vehicle", {
                                        required: true,
                                    })} 
                                />
                            </div>
                            <div className='col-span-1'>
                                <Select
                                    options={mode}
                                    label="Route Preference"
                                    className=""
                                    placeholder="Select route type"
                                    option
                                    setOption={setOption}
                                    {...register("mode", {
                                        required: true,
                                    })} 
                                />
                            </div>
                            <div className='col-span-1'>
                                <Select
                                    options={["true", "false"]}
                                    label="Is your vehicle electric"
                                    className=""
                                    placeholder="Select"
                                    option
                                    setOption={setOption}
                                    {...register("isEV", {
                                        required: true,
                                    })} 
                                />
                            </div>
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
                            value={(e) => e.target.value = lat}
                            readOnly
                            className="w-full px-3 py-2 border text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                            {...register("lat", {
                            })} 
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
                            value={(e) => e.target.value = lng}
                            id={`Longitudex`}
                            className="w-full px-3 py-2 border text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                            {...register("lat", {
                            })} 
                            />
                        </div>
                        <button type="submit" className="w-full text-white px-4 py-2 mt-4 rounded-lg bg-[#18BED4] hover:bg-[#15a8bc]">
                                Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FindRoute