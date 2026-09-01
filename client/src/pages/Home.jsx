
import React, { useEffect, useState } from "react";
import axios from "axios";
import PieChart from "../components/PieChart";

const Home = () => {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/dashboard`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setDashboard(response.data);

            } catch (error) {

                console.error(
                    "Error fetching dashboard:",
                    error
                );

            } finally {

                setLoading(false);

            }
        };

        fetchDashboard();

    }, []);


    if (loading) {

        return (
            <div className="flex min-h-[60vh] items-center justify-center px-4">

                <p className="text-center text-sm text-gray-500 sm:text-base">
                    Loading dashboard...
                </p>

            </div>
        );

    }


    if (!dashboard) {

        return (
            <div className="flex min-h-[60vh] items-center justify-center px-4">

                <p className="text-center text-sm text-gray-500 sm:text-base">
                    Failed to load dashboard.
                </p>

            </div>
        );

    }


    const {
        totalSpent,
        totalSaved,
        savingsRate,
        recentExpenses,
        savingsGoals,
        categorySummary
    } = dashboard;


    return (

        <div className="space-y-6 sm:space-y-8">


            {/* Header */}

            <div>

                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Dashboard
                </h1>

                <p className="mt-1 text-sm text-gray-500 sm:text-base">
                    Here's your financial overview.
                </p>

            </div>


            {/* Summary Cards */}

            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">


                {/* Total Spent */}

                <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

                    <p className="text-sm font-medium text-gray-500">
                        Total spent
                    </p>

                    <p className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                        ₹{totalSpent}
                    </p>

                </div>


                {/* Total Saved */}

                <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

                    <p className="text-sm font-medium text-gray-500">
                        Total saved
                    </p>

                    <p className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                        ₹{totalSaved}
                    </p>

                </div>


                {/* Savings Rate */}

                <div className="rounded-2xl bg-teal-900 p-5 text-white shadow-sm sm:p-6">

                    <p className="text-sm font-medium text-teal-200">
                        Savings rate
                    </p>

                    <p className="mt-2 text-2xl font-bold sm:text-3xl">
                        {savingsRate}%
                    </p>

                </div>

            </div>


            {/* Recent Expenses + Savings Goals */}

            <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">


                {/* Recent Expenses */}

                <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

                    <div className="mb-4 sm:mb-5">

                        <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                            Recent expenses
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Your latest transactions.
                        </p>

                    </div>


                    <div className="divide-y divide-gray-100">

                        {recentExpenses.length === 0 ? (

                            <p className="py-5 text-sm text-gray-500">
                                No expenses yet.
                            </p>

                        ) : (

                            recentExpenses.map((expense) => (

                                <div
                                    key={expense.id}
                                    className="flex items-center justify-between gap-3 py-4"
                                >

                                    {/* Expense info */}

                                    <div className="flex min-w-0 items-center gap-3">

                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 sm:h-10 sm:w-10">

                                            {expense.category === "Food"
                                                ? "🍔"
                                                : expense.category === "Petrol"
                                                    ? "⛽"
                                                    : "🛍️"
                                            }

                                        </div>


                                        <div className="min-w-0">

                                            <p className="truncate font-semibold text-gray-900">
                                                {expense.description}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                {expense.category}
                                            </p>

                                        </div>

                                    </div>


                                    {/* Amount */}

                                    <p className="shrink-0 text-sm font-bold text-gray-900 sm:text-base">
                                        ₹{Number(expense.amount)}
                                    </p>

                                </div>

                            ))

                        )}

                    </div>

                </div>


                {/* Savings Goals */}

                <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

                    <div className="mb-4 sm:mb-5">

                        <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                            Savings goals
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Your progress towards your goals.
                        </p>

                    </div>


                    <div className="space-y-5 sm:space-y-6">

                        {savingsGoals.length === 0 ? (

                            <p className="text-sm text-gray-500">
                                No savings goals yet.
                            </p>

                        ) : (

                            savingsGoals.map((goal) => {

                                const saved =
                                    Number(goal.saved_amount);

                                const target =
                                    Number(goal.target_amount);

                                const progress =
                                    target > 0
                                        ? Math.min(
                                            (saved / target) * 100,
                                            100
                                        )
                                        : 0;


                                return (

                                    <div key={goal.id}>

                                        <div className="flex items-start justify-between gap-3">

                                            <div className="min-w-0">

                                                <p className="truncate font-semibold text-gray-900">
                                                    {goal.name}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    ₹{saved} of ₹{target}
                                                </p>

                                            </div>

                                            <span className="shrink-0 text-sm font-semibold text-teal-700">
                                                {Math.round(progress)}%
                                            </span>

                                        </div>


                                        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-100">

                                            <div
                                                className="h-full rounded-full bg-teal-700 transition-all"
                                                style={{
                                                    width: `${progress}%`
                                                }}
                                            />

                                        </div>

                                    </div>

                                );

                            })

                        )}

                    </div>

                </div>

            </div>


            {/* Category Chart */}

            <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

                <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                    Spending by category
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    See where most of your money is going.
                </p>


                <div className="mt-5 flex w-full justify-center overflow-x-auto sm:mt-6">

                    <PieChart
                        data={categorySummary}
                    />

                </div>

            </div>


        </div>

    );

};

export default Home;

