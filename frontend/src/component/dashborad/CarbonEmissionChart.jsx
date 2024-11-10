import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, Text, ResponsiveContainer } from 'recharts';

function CarbonEmissionChart({co_emission}) {
    // const carbonEmission = co_emission * 10;
    const carbonEmission = .70 * Number(co_emission);

    const data = [
        { name: 'Carbon Emission', value: carbonEmission },
        { name: 'Saved', value: .30 * carbonEmission },
    ];

    const COLORS = ['#FF6384', '#C8C8C8'];

    return (
        <div className="w-full px-4 py-5 bg-white rounded-2xl shadow-lg overflow-hidden">
            <div>
                <h1 className="text-[#1F2833] mb-2 text-start text-xl font-bold profile-text">
                    Carbon Emission %
                </h1>
                <div className="h-[2px] bg-black w-full rounded"></div>
            </div>
            <div className="flex justify-center items-center" style={{ width: '250px', height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={250} height={250}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                    {/* Displaying the carbon emission value in the center */}
                    <Text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#1F2833"
                        fontSize="24px"
                        fontWeight="bold"
                    >
                        {carbonEmission}%
                    </Text>
                </PieChart>
            </ResponsiveContainer>
            </div>
        </div>
    );
}

export default CarbonEmissionChart;
