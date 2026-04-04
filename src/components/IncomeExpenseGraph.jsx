import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar } from 'lucide-react'

const monthlyData = [
  { name: "Jan", income: 12000, expenses: 8000 },
  { name: "Feb", income: 14000, expenses: 9000 },
  { name: "Mar", income: 18000, expenses: 11000 },
  { name: "Apr", income: 15000, expenses: 9500 },
  { name: "May", income: 17000, expenses: 8500 },
  { name: "Jun", income: 13000, expenses: 8000 },
  { name: "Jul", income: 16281, expenses: 6638 },
  { name: "Aug", income: 15500, expenses: 7000 },
  { name: "Sep", income: 14500, expenses: 6000 },
  { name: "Oct", income: 12000, expenses: 7500 },
  { name: "Nov", income: 16500, expenses: 7200 },
  { name: "Dec", income: 15000, expenses: 7800 },
];

const yearlyData = [
  { name: "2020", income: 120000, expenses: 80000 },
  { name: "2021", income: 150000, expenses: 90000 },
  { name: "2022", income: 170000, expenses: 110000 },
  { name: "2023", income: 190000, expenses: 130000 },
  { name: "2024", income: 210000, expenses: 140000 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black text-white p-2 rounded-lg shadow-lg text-sm">
        <p>{label}</p>
        <p>Income: ₹{payload[0].value.toLocaleString()}</p>
        <p>Expenses: ₹{payload[1].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const IncomeExpenseGraph = ({ transactions }) => {
    const [range, setRange] = useState("monthly");

    const data = React.useMemo(() => {
        if (!transactions) return [];

        if (range === "monthly") {
            const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

            return months.map((month, i) => {
                const income = transactions
                .filter(t => new Date(t.date).getMonth() === i && t.type === "income")
                .reduce((a, b) => a + b.amount, 0);

                const expenses = transactions
                .filter(t => new Date(t.date).getMonth() === i && t.type === "expense")
                .reduce((a, b) => a + b.amount, 0);

                return { name: month, income, expenses };
            });
        } 
        else {
            const years = [...new Set(transactions.map(t => new Date(t.date).getFullYear()))];

            return years.map(year => {
                const income = transactions
                .filter(t => new Date(t.date).getFullYear() === year && t.type === "income")
                .reduce((a, b) => a + b.amount, 0);

                const expenses = transactions
                .filter(t => new Date(t.date).getFullYear() === year && t.type === "expense")
                .reduce((a, b) => a + b.amount, 0);

                return { name: year.toString(), income, expenses };
            });
        }
    }, [transactions, range]);

  const avgIncome =
    data.reduce((a, b) => a + b.income, 0) / data.length;
  const avgExpenses =
    data.reduce((a, b) => a + b.expenses, 0) / data.length;

  return (
    <div className="bg-white dark:bg-[#121614] dark:text-gray-100 rounded-2xl p-6 border border-gray-300 dark:border-gray-700 w-full mb-5">
        <div className="flex justify-between items-center mb-4">
            <div>
                <h2 className="text-lg font-semibold">Statistics</h2>
                <div className="flex gap-4 mt-1 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-green-600"></span>
                        <span className="text-gray-600 dark:text-gray-100">Total income</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                        <span className="text-gray-600 dark:text-gray-100">Total expenses</span>
                    </div>
                </div>
            </div>

            <div className="relative inline-block dark:bg-[#121614]">
                <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />

                <select
                    value={range}
                    onChange={(e) => setRange(e.target.value)}
                    className="border rounded-lg pl-8 pr-4 py-1 text-sm appearance-none bg-white dark:bg-gray-900 
                    border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-100 focus:outline-none"
                >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                </select>
            </div>
        </div>

        <div className="w-full h-75">
            <ResponsiveContainer>
                <LineChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis hide />

                    <Tooltip content={<CustomTooltip />} />

                    <Line
                        type="monotone"
                        dataKey="income"
                        stroke="#16a34a"
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 6 }}
                        isAnimationActive={true}
                        animationDuration={1200}
                    />

                    <Line
                        type="monotone"
                        dataKey="expenses"
                        stroke="#f97316"
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 6 }}
                        isAnimationActive={true}
                        animationDuration={1200}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>

        <div className="flex flex-col gap-y-10 min-[660px]:flex-row min-[660px]:gap-x-40 min-[750px]:gap-x-64 mt-6">
            <div>
                <p className="text-sm text-gray-500">Average income</p>
                <p className="text-2xl font-semibold">
                    ₹ {avgIncome.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
                <div className="flex items-center text-sm">
                    <span className="text-green-600 pr-2 py-1 font-bold">
                        +2.5%
                    </span>
                    <span className="opacity-70">compared to last month</span>
                </div>
            </div>

            <div>
                <p className="text-sm text-gray-500">Average expenses</p>
                <p className="text-2xl font-semibold">
                    ₹ {avgExpenses.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
                <div className="flex items-center text-sm">
                    <span className="text-red-600 pr-2 py-1 font-bold">
                        -1.8%
                    </span>
                    <span className="opacity-70">compared to last month</span>
                </div>
            </div>
        </div>
    </div>
  );
}
export default IncomeExpenseGraph;