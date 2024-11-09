import React, { useEffect, useRef } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

function CarbonEmissionChart() {
    const chartRef = useRef(null);
    const carbonEmission = 70

    const data = {
        labels: ['Carbon Emission', 'Remaining'],
        datasets: [
            {
                data: [carbonEmission, 100 - carbonEmission],
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(200, 200, 200, 0.3)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(200, 200, 200, 0.3)'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
        cutout: '70%',
        responsive: true,
        maintainAspectRatio: false,
        animation: false
    };

    useEffect(() => {
        // Check if there is an existing chart instance and destroy it before creating a new one
        if (chartRef.current) {
            chartRef.current.destroy();
        }
    }, [carbonEmission]);

    return (
        <div className='className="w-full my- px-7 py-5 bg-white rounded-2xl shadow-lg overflow-hidden'>
            <div>
               <h1 className='text-[#1F2833] mb-2 text-start text-xl font-bold profile-text'>Carbon Emission %</h1>
                <div className='h-[2px] bg-black w-full rounded'></div>
            </div>
            <div className='flex justify-center' style={{ width: '300px', height: '300px' }}>
                <Doughnut ref={chartRef} data={data} options={options} />
            </div>
        </div>
    );
}

export default CarbonEmissionChart;
