import React from 'react'
import Chart from 'chart.js/auto';
import { Doughnut} from 'react-chartjs-2';
import data from './data.json'
import { Colors } from 'chart.js';

Chart.register(Colors);

function CarbonEmissionChart() {
  const skill = []
  const skillScore = []
  Object.keys(data.skills).forEach(key => {
    skill.push(key)
    skillScore.push(data.skills[key])
  });
  return (
    <div className="w-full px-7 py-5 bg-white rounded-2xl shadow-lg overflow-hidden">
      <div>
        <div>
            <h1 className='text-[#1F2833] mb-2 text-start text-xl font-bold profile-text'>User Stats</h1>
            <div className='h-[2px] bg-black w-full rounded'></div>
        </div>
        <div>
          <Doughnut
            data={{
              labels: skill,
              datasets: [
                {
                  label: "Skills",
                  data: skillScore,
                  backgroundColor: [
                    '#18bed4',
                    '#03d0cc',
                    '#48dfb8',
                    '#82ec9f',
                    '#bcf484',
                    '#f9f871',
                    '#baa2e5',
                    '#836ead'
                  ],
                  borderColor: [
                    '#18bed4',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)',
                    'rgb(101, 113, 207)'
                  ],
                  borderRadius : 5
                }
              ],
              
              
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default CarbonEmissionChart