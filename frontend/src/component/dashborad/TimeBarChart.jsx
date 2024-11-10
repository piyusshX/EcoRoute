import React from 'react'
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { Colors } from 'chart.js';

Chart.register(Colors);

function TimeBarChart({}) {
    const arrX = ['Subject A', 'Subject B', 'Subject C', 'Subject D', 'Subject E']
    const arrY = [85, 72, 90, 65, 50]
  return (
    <div className="w-full px-7 py-5 bg-white rounded-2xl shadow-xl overflow-hidden">
      <div>
        <div>
            <h1 className='text-[#1F2833] mb-2 text-start text-xl font-bold profile-text'>Time each route take</h1>
            <div className='h-[2px] bg-black w-full rounded'></div>
        </div>
        <div>
          <Bar
            data={{
              labels: arrX,
              datasets: [
                {
                    label: "",
                  data: arrY,
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                  ],
                  borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                  ],
                  borderWidth: 1
                }
              ],
              
              
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default TimeBarChart