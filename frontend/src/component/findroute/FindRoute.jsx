import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapPinCheck, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Select from './Select';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function FindRoute() {
    const { authToken, setAuthToken } = useContext(AuthContext);

    if (!authToken) {
        return(
            <div className="bg-[#F7F7F7] text-[#1F2833] font-bold text-5xl px-20 py-28 w-full h-[100vh] flex justify-center items-center">
                unauthenticated...
            </div>
        )
    }

    const navigate = useNavigate();
    const { register, handleSubmit, watch, setValue, reset } = useForm();
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const vehicle = ["Car", "Motorcycle", "Scooter", "Truck"];
    const mode = ["short", "eco", "fast", "balanced"];
    const deliveryValue = watch("delivery");

    const handleSearchClick = async () => {
        const requestBody = JSON.stringify({ place: deliveryValue });
        console.log("Request body being sent:", requestBody);

        const response = await fetch('http://localhost:8000/api/place/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: requestBody
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('deliveryCords', JSON.stringify(data));
            console.log('Delivery coordinates fetched:', data);
            setLat(data.latitude);
            setLng(data.longitude);
            setValue("lat", data.latitude); // Set lat value in form
            setValue("lng", data.longitude); // Set lng value in form
        } else {
            console.error('Failed to fetch delivery coordinates');
        }
    };

    const deliveryLocation = async (data) => {
        const deliveryCords = JSON.parse(localStorage.getItem('deliveryCords')) || {};
        let agentLat = parseFloat(localStorage.getItem('lat'));
        let agentLng = parseFloat(localStorage.getItem('lng'));

        // If agent location is missing or invalid, use default values
        if (isNaN(agentLat) || isNaN(agentLng)) {
            console.log("Agent location not found or invalid. Using default values.");
            agentLat = 28.6129;  // Default Latitude (Berlin)
            agentLng = 77.2295;  // Default Longitude (Berlin)
        }

        console.log(deliveryCords)

        // Ensure that deliveryCords has lat/lng
        if (!deliveryCords.latitude || !deliveryCords.longitude) {
            console.error('Invalid delivery location: lat/lng are missing');
            return;
        }

        // Log params before sending the request
        const params = {
            agent_location: { lat: agentLat, lng: agentLng },
            delivery_location: { lat: deliveryCords.latitude, lng: deliveryCords.longitude },
            vehicle_type: data.vehicle,
            route_pref: data.mode,
            Fuel: data.Fuel,
        };

        console.log("Parameters to be sent:", params); // Log parameters to ensure delivery coordinates are present

        const response = await fetch('http://localhost:8000/api/find-route/', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('Route found and saved:', responseData);
            navigate("/find-route");
            window.location.reload();
            window.location.reload();
        } else {
            const errorData = await response.json();
            console.error('Route finding failed:', errorData);
        }
    };

    const addMoreFields = () => {
        reset();
        setLat(0);
        setLng(0);
    };

    return (
        <div className='px-20 pt-40 pb-20 w-[90%] max-w-[1200px] mx-auto flex flex-col justify-center items-center'>
            <div className='bg-gray-100 rounded-xl px-5 py-5 border border-black/10 w-full'>
                <h2 className="text-center text-2xl flex justify-center pt-6 font-bold leading-tight text-black">
                    <MapPinCheck className='text-[#18BED4] mr-2' /> Route Finder
                </h2>
                <div className='space-y-4 w-full py-6'>
                    <form onSubmit={handleSubmit(deliveryLocation)} className='grid border p-3 rounded grid-cols-2 gap-4'>
                        <div className='col-span-2 flex gap-2'>
                            <input
                                type="text"
                                placeholder="Enter delivery location"
                                className="w-full px-3 py-2 border rounded-md text-gray-700"
                                {...register("delivery", { required: true })}
                            />
                            <button
                                type="button"
                                onClick={handleSearchClick}
                                className="py-2 pr-4 pl-3 font-semibold bg-[#18BED4] text-white hover:bg-[#15a8bc] hover:scale-[1.02] transition-all duration-200 rounded-lg flex"
                            >
                                <Search className="mr-2 w-7" />
                                Search
                            </button>
                        </div>

                        <div className='col-span-1'>
                            <Select
                                options={vehicle}
                                label="Vehicle type"
                                placeholder="Select vehicle type"
                                {...register("vehicle", { required: true })}
                            />
                        </div>
                        <div className='col-span-1'>
                            <Select
                                options={mode}
                                label="Route Preference"
                                placeholder="Select route type"
                                {...register("mode", { required: true })}
                            />
                        </div>
                        <div className='col-span-1'>
                            <Select
                                options={["petrol", "diesel", "electric"]}
                                label="Select Fuel type:"
                                placeholder="Select"
                                {...register("Fuel", { required: true })}
                            />
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="Latitude" className="block text-sm font-medium text-gray-700 mb-1">
                                Latitude (Delivery)
                            </label>
                            <input
                                type="number"
                                id="Latitude"
                                value={lat}
                                readOnly
                                className="w-full px-3 py-2 border text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                                {...register("lat")}
                            />
                        </div>
                        <div className="col-span-1">
                            <label htmlFor="Longitude" className="block text-sm font-medium text-gray-700 mb-1">
                                Longitude (Delivery)
                            </label>
                            <input
                                type="number"
                                id="Longitude"
                                value={lng}
                                readOnly
                                className="w-full px-3 py-2 border text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                                {...register("lng")}
                            />
                        </div>
                        
                        <div className="col-span-2 flex gap-4 mt-4">
                            <button
                                type="submit"
                                className="w-1/2 text-white px-4 py-2 rounded-lg bg-[#18BED4] hover:bg-[#15a8bc]"
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                onClick={addMoreFields}
                                className="w-1/2 text-white px-4 py-2 rounded-lg bg-[#18BED4] hover:bg-[#15a8bc]"
                            >
                                Add More
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FindRoute;
