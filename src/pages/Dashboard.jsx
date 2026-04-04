import React, { useEffect, useState } from "react";
import MyBalance from "../components/MyBalance";
import IncomeExpence from "../components/IncomeExpence";
import AllExpenses from "../components/AllExpences";
import IncomeExpenseGraph from "../components/IncomeExpenseGraph";
import Ad from "../components/Ad";

const Dashboard = () => {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem("transactions");
        if (saved) {
            setTransactions(JSON.parse(saved));
        }
    }, []);

    // ✅ TOTALS
    const totalIncome = transactions
        .filter(t => t.type === "income")
        .reduce((a, b) => a + b.amount, 0);

    const totalExpense = transactions
        .filter(t => t.type === "expense")
        .reduce((a, b) => a + b.amount, 0);

    const balance = totalIncome - totalExpense;

    // ✅ MONTHLY (current month)
    const currentMonth = new Date().getMonth();

    const monthlyIncome = transactions
        .filter(t => new Date(t.date).getMonth() === currentMonth && t.type === "income")
        .reduce((a, b) => a + b.amount, 0);

    const monthlyExpense = transactions
        .filter(t => new Date(t.date).getMonth() === currentMonth && t.type === "expense")
        .reduce((a, b) => a + b.amount, 0);

    // ✅ CATEGORY PERCENTAGE
    const categoryMap = {};

    transactions
        .filter(t => t.type === "expense")
        .forEach(t => {
            categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
        });

    const totalExp = Object.values(categoryMap).reduce((a, b) => a + b, 0);

    const colors = ["#22c55e", "#ef4444", "#f97316", "#06b6d4", "#8b5cf6", "#14b8a6"];

    const expenseData = Object.keys(categoryMap).map((key, index) => ({
        name: key,
        value: totalExp ? Math.round((categoryMap[key] / totalExp) * 100) : 0,
        color: colors[index % colors.length],
    }));

    return (
        <div className="px-6 dark:bg-gray-950 py-4">
            <div className="flex flex-col min-[1300px]:flex-row gap-4 w-full">
                <div className="min-[1300px]:w-7/10 w-full flex flex-col gap-4">
                    <div className="w-full flex flex-col min-[900px]:flex-row gap-4">
                        <div className="min-[900px]:w-2/5 w-full">
                            <MyBalance balance={balance} />
                        </div>
                        <div className="flex gap-4 min-[900px]:w-3/5 w-full">
                            <IncomeExpence 
                                inc_exp="Income"
                                money={monthlyIncome.toLocaleString()}
                                inc_dec="+2.5%"
                            />
                            <IncomeExpence 
                                inc_exp="Expense"
                                money={monthlyExpense.toLocaleString()}
                                inc_dec="-1.8%"
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        <IncomeExpenseGraph transactions={transactions} />
                    </div>
                </div>

                <div className="min-[1300px]:w-3/10 w-full">
                    <div className="flex flex-col gap-4">
                        <AllExpenses
                            data={expenseData}
                            daily={(monthlyExpense / 30).toFixed(0)}
                            weekly={(monthlyExpense / 4).toFixed(0)}
                            monthly={monthlyExpense}
                        />
                        <Ad />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;