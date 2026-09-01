
import React, { useEffect, useState } from "react";
import axios from "axios";
import PieChart from "../components/PieChart";

const Analytics = () => {

    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchAnalytics = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/analytics`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setAnalytics(response.data);

            } catch (error) {

                console.error(
                    "Error fetching analytics:",
                    error
                );

            } finally {

                setLoading(false);

            }
        };

        fetchAnalytics();

    }, []);


    if (loading) {

        return (
            <div className="flex min-h-[60vh] items-center justify-center">

                <p className="text-gray-500">
                    Loading analytics...
                </p>

            </div>
        );

    }


    if (!analytics) {

        return (
            <div className="flex min-h-[60vh] items-center justify-center">

                <p className="text-gray-500">
                    Failed to load analytics.
                </p>

            </div>
        );

    }


    const {
        totalSpent,
        totalSaved,
        savingsRate,
        categorySummary,
        highestExpense,
        averageExpense
    } = analytics;


    return (

        <div className="space-y-8">


            {/* Header */}

            <div>

                <h1 className="text-3xl font-bold text-gray-900">
                    Analytics
                </h1>

                <p className="mt-1 text-gray-500">
                    Understand your spending and saving patterns.
                </p>

            </div>


            {/* Summary cards */}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">


                {/* Total spent */}

                <div className="rounded-2xl bg-white p-6 shadow-sm">

                    <p className="text-sm font-medium text-gray-500">
                        Total spent
                    </p>

                    <p className="mt-2 text-3xl font-bold text-gray-900">
                        ₹{totalSpent}
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                        Across all expenses
                    </p>

                </div>


                {/* Total saved */}

                <div className="rounded-2xl bg-white p-6 shadow-sm">

                    <p className="text-sm font-medium text-gray-500">
                        Total saved
                    </p>

                    <p className="mt-2 text-3xl font-bold text-gray-900">
                        ₹{totalSaved}
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                        Across all savings goals
                    </p>

                </div>


                {/* Savings rate */}

                <div className="rounded-2xl bg-teal-900 p-6 text-white shadow-sm">

                    <p className="text-sm font-medium text-teal-200">
                        Savings rate
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                        {savingsRate}%
                    </p>

                    <p className="mt-2 text-sm text-teal-200">
                        Of your total money
                    </p>

                </div>

            </div>


            {/* Charts + insights */}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">


                {/* Category chart */}

                <div className="rounded-2xl bg-white p-6 shadow-sm">

                    <h2 className="text-xl font-bold text-gray-900">
                        Spending by category
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Where your money is going.
                    </p>

                    <div className="mt-6 flex justify-center">

                        <PieChart
                            data={categorySummary}
                        />

                    </div>

                </div>


                {/* Highest expense */}

                <div className="rounded-2xl bg-white p-6 shadow-sm">

                    <h2 className="text-xl font-bold text-gray-900">
                        Spending insights
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        A quick look at your spending habits.
                    </p>


                    {highestExpense && (

                        <div className="mt-8">

                            <p className="text-sm text-gray-500">
                                Highest expense
                            </p>

                            <p className="mt-2 text-3xl font-bold text-gray-900">
                                ₹{Number(highestExpense.amount)}
                            </p>

                            <p className="mt-2 font-semibold text-gray-800">
                                {highestExpense.description}
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                {highestExpense.category}
                            </p>

                        </div>

                    )}


                    <div className="mt-8 border-t border-gray-100 pt-6">

                        <p className="text-sm text-gray-500">
                            Average expense
                        </p>

                        <p className="mt-2 text-2xl font-bold text-gray-900">
                            ₹{Number(averageExpense).toFixed(2)}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            Per transaction
                        </p>

                    </div>

                </div>

            </div>


            {/* Monthly spending */}




        </div>

    );

};

export default Analytics;
