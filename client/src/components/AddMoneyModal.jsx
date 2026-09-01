
import React, { useState } from "react";
import axios from "axios";

const AddMoneyModal = ({ goal, onClose, onMoneyAdded }) => {

    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/savings/${goal.id}/add`,
                {
                    amount: Number(amount)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Send updated goal back to Savings.jsx
            onMoneyAdded(response.data.goal);

            onClose();

        } catch (error) {

            console.error("Error adding money:", error);

            alert(
                error.response?.data?.message ||
                "Failed to add money"
            );

        } finally {

            setLoading(false);

        }
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

                {/* Header */}

                <div className="mb-6 flex items-center justify-between">

                    <div>

                        <h2 className="text-xl font-bold text-gray-900">
                            Add money
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {goal.name}
                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="text-xl text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>

                </div>


                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Amount */}

                    <div>

                        <label className="text-sm font-medium text-gray-700">
                            Amount
                        </label>

                        <div className="relative mt-2">

                            <span className="absolute left-4 top-1/2
                                             -translate-y-1/2
                                             text-gray-500">
                                ₹
                            </span>

                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="5000"
                                min="1"
                                required
                                className="w-full rounded-xl border
                                           border-gray-200 py-3 pl-9 pr-4
                                           outline-none
                                           focus:border-teal-600"
                            />

                        </div>

                    </div>


                    {/* Current progress */}

                    <div className="rounded-xl bg-gray-50 p-4">

                        <div className="flex justify-between text-sm">

                            <span className="text-gray-500">
                                Currently saved
                            </span>

                            <span className="font-semibold">
                                ₹{Number(goal.saved_amount)}
                            </span>

                        </div>

                        <div className="mt-2 flex justify-between text-sm">

                            <span className="text-gray-500">
                                Target
                            </span>

                            <span className="font-semibold">
                                ₹{Number(goal.target_amount)}
                            </span>

                        </div>

                    </div>


                    {/* Buttons */}

                    <div className="flex gap-3 pt-2">

                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-xl border
                                       border-gray-200 px-4 py-3
                                       font-semibold hover:bg-gray-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 rounded-xl bg-teal-900
                                       px-4 py-3 font-semibold text-white
                                       hover:bg-teal-800
                                       disabled:opacity-50"
                        >
                            {loading ? "Adding..." : "Add Money"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default AddMoneyModal;

