
import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateGoalModal from "../components/CreateGoalModal";
import AddMoneyModal from "../components/AddMoneyModal";

const Savings = () => {

    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState(null);

    useEffect(() => {

        const fetchGoals = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/savings`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setGoals(response.data.goals);

            } catch (error) {

                console.error("Error fetching savings goals:", error);

            } finally {

                setLoading(false);

            }
        };

        fetchGoals();

    }, []);


    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-gray-500">
                    Loading savings...
                </p>
            </div>
        );
    }


    return (
        <div className="space-y-8">

        

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Savings
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Track your goals and build towards them.
                    </p>
                </div>

                <button
                    onClick={() => setShowCreateModal(true)}
                    className="rounded-xl bg-teal-900 px-5 py-2.5
                               text-sm font-semibold text-white
                               transition hover:bg-teal-800"
                >
                    + Create Goal
                </button>

            </div>


        

            {goals.length === 0 ? (

                <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

                    <p className="text-lg font-semibold text-gray-900">
                        No savings goals yet
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                        Create your first goal and start saving.
                    </p>

                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="mt-5 rounded-xl bg-teal-900 px-5 py-2.5
                                   text-sm font-semibold text-white
                                   hover:bg-teal-800"
                    >
                        Create your first goal
                    </button>

                </div>

            ) : (

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                    {goals.map((goal) => {

                        const currentAmount = Number(goal.saved_amount);
                        const targetAmount = Number(goal.target_amount);

                        const progress = targetAmount > 0
                            ? Math.min(
                                (currentAmount / targetAmount) * 100,
                                100
                            )
                            : 0;

                        return (

                            <div
                                key={goal.id}
                                className="rounded-2xl bg-white p-6 shadow-sm"
                            >


                                <div className="flex items-start justify-between">

                                    <div>

                                        <h2 className="text-xl font-bold text-gray-900">
                                            {goal.name}
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Target date: {goal.target_date}
                                        </p>

                                    </div>

                                    <span className="text-2xl">
                                        🎯
                                    </span>

                                </div>


                             

                                <div className="mt-6 flex items-end justify-between">

                                    <div>

                                        <p className="text-sm text-gray-500">
                                            Saved
                                        </p>

                                        <p className="text-2xl font-bold text-gray-900">
                                            ₹{currentAmount}
                                        </p>

                                    </div>

                                    <div className="text-right">

                                        <p className="text-sm text-gray-500">
                                            Goal
                                        </p>

                                        <p className="font-semibold text-gray-900">
                                            ₹{targetAmount}
                                        </p>

                                    </div>

                                </div>



                                <div className="mt-5">

                                    <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">

                                        <div
                                            className="h-full rounded-full bg-teal-700 transition-all"
                                            style={{
                                                width: `${progress}%`
                                            }}
                                        />

                                    </div>

                                    <div className="mt-2 flex justify-between text-sm">

                                        <span className="text-gray-500">
                                            {Math.round(progress)}% complete
                                        </span>

                                        <span className="font-semibold text-gray-700">
                                            ₹{Math.max(targetAmount - currentAmount, 0)} left
                                        </span>

                                    </div>

                                </div>


                                

                            <button
    onClick={() => {
        setSelectedGoal(goal);
        setShowAddMoneyModal(true);
    }}
    className="mt-6 w-full rounded-xl
               bg-teal-50 px-4 py-3
               text-sm font-semibold
               text-teal-900
               hover:bg-teal-100"
>
    + Add Money
</button>

                            </div>

                        );

                    })}

                </div>

            )}

            {showAddMoneyModal && selectedGoal && (
    <AddMoneyModal
        goal={selectedGoal}
        onClose={() => {
            setShowAddMoneyModal(false);
            setSelectedGoal(null);
        }}
        onMoneyAdded={(updatedGoal) => {

            setGoals((prev) =>
                prev.map((goal) =>
                    goal.id === updatedGoal.id
                        ? updatedGoal
                        : goal
                )
            );

        }}
    />
)}

            {/* Create Goal Modal */}

            {showCreateModal && (
                <CreateGoalModal
                    onClose={() => setShowCreateModal(false)}
                    onGoalCreated={(newGoal) => {
                        setGoals((prev) => [newGoal, ...prev]);
                    }}
                />
            )}

        </div>
    );
};

export default Savings;
