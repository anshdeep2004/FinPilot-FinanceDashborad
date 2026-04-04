import React from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const AllExpenses = ({ data, daily, weekly, monthly }) => {
  return (
    <div className="bg-white dark:bg-[#121614] p-6 rounded-2xl border border-gray-300 w-full dark:border-gray-700">
      
      {/* Title */}
      <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">All expenses</h2>

      {/* Stats */}
      <div className="flex justify-between text-sm mb-6">
        <div>
          <p className="text-gray-500 dark:text-gray-200">Daily</p>
          <p className="font-semibold dark:text-gray-100">₹{daily}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-200">Weekly</p>
          <p className="font-semibold dark:text-gray-100">₹{weekly}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-200">Monthly</p>
          <p className="font-semibold dark:text-gray-100">₹{monthly}</p>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="w-full h-48">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={40}
              outerRadius={70}
              paddingAngle={2}
              isAnimationActive={true}
              animationDuration={1200}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>

            {/* Tooltip */}
            <Tooltip 
              formatter={(value, name) => [`${value}%`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm dark:text-gray-100">
            <div className="flex items-center gap-2">
              <span 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              ></span>
              <span>{item.name}</span>
            </div>
            <span className="font-medium">{item.value}%</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AllExpenses;