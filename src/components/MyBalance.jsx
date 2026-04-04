import react from "react";

const MyBalance = ({ balance }) => {
    return (
        <div className="bg-white dark:bg-[#121614] text-black p-6 rounded-2xl w-full h-44 border border-gray-300 dark:border-gray-700">
            <p className="text-sm opacity-80 dark:text-gray-100">Total Balance</p>
            <div className="flex gap-1 items-center">
                <h2 className="text-3xl font-bold mt-2 dark:text-gray-100">₹ {balance.toLocaleString()}</h2>
                <div className="flex items-center mt-3 text-sm dark:text-gray-100">
                    <span className="text-green-600 px-2 py-1 font-bold">
                    +2.5%
                    </span>
                    <span className="opacity-80">vs last month</span>
                </div>
            </div>
            <div className="flex gap-3 items-center mt-5 w-full">
                <button className="bg-green-600 text-white text-sm w-1/2 px-4 py-2 rounded-lg ml-auto hover:bg-green-700 transition-colors duration-300">
                    Add Money
                </button>
                <button className="bg-white dark:bg-gray-200 text-green-600 text-sm font-bold
                 w-1/2 px-4 py-2 rounded-lg border border-gray-300 ml-auto hover:bg-gray-50 
                 hover:dark:bg-gray-300 transition-colors duration-300">
                    Transaction
                </button>
            </div>
        </div>
    )
}
export default MyBalance;