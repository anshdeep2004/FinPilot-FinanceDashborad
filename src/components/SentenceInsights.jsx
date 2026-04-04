import React from "react";
import { Layers } from "lucide-react";

const SentenceInsights = ({ transactions }) => {

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const map = {};
  transactions
    .filter(t => t.type === "expense")
    .forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });

  const topCategory = Object.keys(map).reduce(
    (a, b) => (map[a] > map[b] ? a : b),
    Object.keys(map)[0]
  );

  return (
  <div className="bg-white p-6 rounded-2xl border border-gray-300 h-fit dark:text-gray-100 dark:bg-[#121614] dark:border-gray-700">
    <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold mb-4">Insights</h2>
        <Layers className="text-gray-500 mb-5 dark:text-gray-300" size={24} />
      </div>

    <ul className="text-sm space-y-3">
      <li className="flex items-center gap-2 font-medium text-gray-600 dark:text-gray-300"><span>You earned ₹{income.toLocaleString()} this month</span></li>
      <li className="flex items-center gap-2 font-medium text-gray-600 dark:text-gray-300"><span>You spent ₹{expense.toLocaleString()}</span></li>
      <li className="flex items-center gap-2 font-medium text-gray-600 dark:text-gray-300"><span>Savings ₹{(income - expense).toLocaleString()}</span></li>

      {topCategory && (
        <li className="flex items-center gap-2 text-orange-600 font-medium">
          Highest spending on {topCategory}
        </li>
      )}

      {income > expense && (
        <li className="text-green-600 font-medium">You are saving money</li>
      )}

      {expense > income && (
        <li className="text-red-600 font-medium">Expenses exceeded income</li>
      )}
    </ul>
  </div>
);
};

export default SentenceInsights;