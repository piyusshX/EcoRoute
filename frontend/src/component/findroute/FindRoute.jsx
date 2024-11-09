import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MapPinCheck, Search, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Select from './Select';

function FindRoute() {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, setValue } = useForm();
    const [option, setOption] = useState("");
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [forms, setForms] = useState([0]); // State to keep track of form duplicates

    const vehicle = ["Bicycle", "Car", "Motorcycle", "Scooter", "Truck"];
    const mode = ["short", "eco", "fast", "balanced"];

    // Watch the "delivery" field to ensure it captures the latest value
    const deliveryValue = watch("delivery");

    const handleSearchClick = async (index) => {
        const requestBody = JSON.stringify({ place: deliveryValue });
        console.log("Request body being sent:", requestBody); // Log the JSON body

        const response = await fetch('http://localhost:8000/api/place/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: requestBody // Send only the `place` key with the delivery value
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('deliveryCords', JSON.stringify(data));
            console.log('delivery coordinates fetched:', data);
            setLat(data.latitude);
            setLng(data.longitude);

            // Update latitude and longitude fields dynamically based on fetched data
            setValue(`lat-${index}`, data.latitude);
            setValue(`lng-${index}`, data.longitude);
        } else {
            console.error('Failed to fetch delivery coordinates');
        }
    };

    const deliveryLocation = async (data) => {
        const deliveryCords = JSON.parse(localStorage.getItem('deliveryCords')) || {};

        const params = {
            agent_location: { lat: parseFloat(localStorage.getItem('lat')), lng: parseFloat(localStorage.getItem('lng')) },
            delivery_location: { lat: deliveryCords.lat, lng: deliveryCords.lng },
            vehicle_type: data.vehicle,
            speed: data.mode,
            Fuel: data.Fuel,
        };

        const response = await fetch('http://localhost:8000/api/find-route/', {
            method: 'POST',
            headers: {
                'Authentication': `Token ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });

        if (response.ok) {
            const responseData = await response.json();
            localStorage.setItem('authToken', responseData.token);
            console.log('Login Successful:', responseData);
            navigate("/");
        } else {
            const errorData = await response.json();
            console.error('Login Failed:', errorData);
        }
    };

    // Function to duplicate the form
    const addForm = () => {
        setForms([...forms, forms.length]); // Add a new form to the array
    };

    return (
        <div className='px-20 pt-40 pb-20 w-[90%] max-w-[1200px] mx-auto flex flex-col justify-center items-center'>
            <div className='bg-gray-100 rounded-xl px-5 py-5 border border-black/10 w-full'>
                <h2 className="text-center text-2xl flex justify-center pt-6 font-bold leading-tight text-black">
                    <MapPinCheck className='text-[#18BED4] mr-2' /> Route Finder
                </h2>
                <div className='space-y-4 w-full py-6'>
                    {forms.map((_, index) => (
                        <form key={index} onSubmit={handleSubmit(deliveryLocation)} className='grid border p-3 rounded grid-cols-2 gap-4'>
                            <div className='col-span-2 flex gap-2'>
                                <input
                                    type="text"
                                    placeholder="Enter delivery location"
                                    className="w-full px-3 py-2 border rounded-md text-gray-700"
                                    {...register(`delivery-${index}`, { required: true })}
                                />
                                <button
                                    type="button"
                                    onClick={() => handleSearchClick(index)} // Pass the index to handleSearchClick
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
                                    setOption={setOption}
                                    {...register(`vehicle-${index}`, { required: true })}
                                />
                            </div>
                            <div className='col-span-1'>
                                <Select
                                    options={mode}
                                    label="Route Preference"
                                    placeholder="Select route type"
                                    setOption={setOption}
                                    {...register(`mode-${index}`, { required: true })}
                                />
                            </div>
                            <div className='col-span-1'>
                                <Select
                                    options={["petrol", "diesel", "electric"]}
                                    label="Select Fuel type:"
                                    placeholder="Select"
                                    setOption={setOption}
                                    {...register(`Fuel-${index}`, { required: true })}
                                />
                            </div>
                            <div className="col-span-1">
                                <label htmlFor={`Latitude-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                    Latitude
                                </label>
                                <input
                                    type="number"
                                    id={`Latitude-${index}`}
                                    value={lat}
                                    readOnly
                                    className="w-full px-3 py-2 border text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                                    {...register(`lat-${index}`)}
                                />
                            </div>
                            <div className="col-span-1">
                                <label htmlFor={`Longitude-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                    Longitude
                                </label>
                                <input
                                    type="number"
                                    id={`Longitude-${index}`}
                                    value={lng}
                                    readOnly
                                    className="w-full px-3 py-2 border text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                                    {...register(`lng-${index}`)}
                                />
                            </div>
                            <div className="col-span-2">
                                <button type="submit" className="w-full text-white px-4 py-2 mt-4 rounded-lg bg-[#18BED4] hover:bg-[#15a8bc]">
                                    Submit
                                </button>
                            </div>
                        </form>
                    ))}
                </div>
            </div>

            {/* Add route button at bottom right */}
            <button
                type="button"
                className="fixed bottom-10 right-10 p-4 bg-[#18BED4] text-white rounded-full shadow-lg hover:bg-[#15a8bc] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                onClick={addForm} // Call addForm function on click
            >
                <PlusCircle className="w-10 h-10" />
            </button>
        </div>
    );
}

export default FindRoute;
