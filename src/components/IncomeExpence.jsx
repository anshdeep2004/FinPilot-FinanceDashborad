import React from "react";
import { Wallet } from 'lucide-react'

const IncomeExpence = ({ inc_exp, money, inc_dec }) => {
    const isIncome = inc_exp === "Income";
    return (
        <div className="bg-white dark:bg-[#121614] text-black dark:text-gray-100  p-6 rounded-2xl w-full border border-gray-300 dark:border-gray-700 h-44 max-h-44">
            <Wallet className={`${isIncome ? "text-green-600" : "text-red-600"} w-5 h-5`} size={32} />
            <p className="font-medium mt-3">Monthly {inc_exp}</p>
            <h2 className="text-2xl font-bold mt-4">₹ {money}</h2>
            <div className="flex items-center text-sm">
                <span className={`${isIncome ? "text-green-600" : "text-red-600"} pr-2 py-1 font-bold`}>
                    {inc_dec}
                </span>
                <span className="opacity-70">compared to last month</span>
            </div>
        </div>
    );
}
export default IncomeExpence;