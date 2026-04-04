import React from "react";
import { Plus, Minus } from "lucide-react";
import { Clipboard } from "lucide-react";

const Summary = ({ transactions }) => {

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const savings = income - expense;
  const savingsRate = income ? ((savings / income) * 100).toFixed(1) : 0;

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-300 dark:border-gray-700 dark:bg-[#121614] dark:text-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold mb-4">Monthly Summary</h2>
        <Clipboard className="text-gray-500 mb-5 dark:text-gray-300" size={24} />
      </div>

      <div className="flex flex-col gap-4 text-sm">
        <div className="text-green-600 font-bold text-xl">+ ₹{income.toLocaleString()}</div>
        <div className="text-red-600 font-bold text-xl">- ₹{expense.toLocaleString()}</div>
        <div className="font-medium text-sm text-gray-600 dark:text-gray-300">Saved ₹{savings.toLocaleString()} with a saving rate of {savingsRate}%</div>
      </div>
    </div>
  );
};

export default Summary;