import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const TransactionList = ({ transactions, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-300 dark:border-gray-700 dark:bg-[#121614] overflow-hidden">

      <div
        className={`grid ${
          onEdit
            ? "grid-cols-[1.2fr_2.5fr_1.2fr_1fr_1fr_0.8fr]"
            : "grid-cols-[1.2fr_3fr_1.5fr_1.2fr_1.3fr]"
        } px-6 py-3 text-sm font-semibold text-gray-600 dark:text-gray-100 border-b border-gray-300 dark:border-gray-700`}
      >
        <div>Date</div>
        <div>Description</div>
        <div>Category</div>
        <div>Type</div>
        <div>Amount</div>
        {onEdit && <div className="text-right">Actions</div>}
      </div>

      {transactions.map((trans, index) => (
        <div
          key={index}
          className={`grid ${
            onEdit
              ? "grid-cols-[1.2fr_2.5fr_1.2fr_1fr_1fr_0.8fr]"
              : "grid-cols-[1.2fr_3fr_1.5fr_1.2fr_1.3fr]"
          } px-6 py-4 items-center border-b border-gray-300 dark:border-gray-700
          last:border-none text-sm hover:bg-gray-100 hover:dark:bg-gray-950 transition-colors duration-200 w-full`}
        >
          <div className="text-gray-700 dark:text-gray-100 w-full">{trans.date}</div>

          <div className="font-medium text-gray-900 dark:text-gray-100 w-full">
            {trans.description}
          </div>

          <div>
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-xs w-full dark:text-gray-100 dark:bg-gray-700">
              {trans.category}
            </span>
          </div>

          <div>
            <span
              className={`px-2 py-1 rounded-md text-xs font-medium w-full ${
                trans.type === "income"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {trans.type === "income" ? "Income" : "Expense"}
            </span>
          </div>

          <div
            className={`font-medium w-full ${
              trans.type === "income" ? "text-green-600" : "text-red-500"
            }`}
          >
            {trans.type === "income" ? "+" : "-"}₹
            {Math.abs(trans.amount).toLocaleString()}
          </div>

          {onEdit && (
            <div className="flex justify-end gap-4 text-gray-600 dark:text-gray-100 w-full">
              <button onClick={() => onEdit(trans)} className="hover:text-blue-600">
                <Pencil size={16} />
              </button>

              <button onClick={() => onDelete(trans)} className="hover:text-red-600">
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TransactionList;