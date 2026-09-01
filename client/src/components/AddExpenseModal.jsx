import React, { useState } from "react";
import axios from "axios";

const AddExpenseModal = ({ onClose, onExpenseAdded,expense = null }) => {

    const [formData, setFormData] = useState({
        amount: "",
        description: "",
        category: "Food",
        expense_date: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/expenses`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            onExpenseAdded(response.data.expense);

            onClose();

        } catch (error) {

            console.error("Error adding expense:", error);

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Something went wrong. Please try again.");
            }

        } finally {
            setLoading(false);
        }
    };


    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center
                       bg-black/40 px-4"
        >

            <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-xl">

                
                <div className="mb-6 flex items-start justify-between">

                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Add Expense
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Record a new expense.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-xl text-gray-400 transition
                                   hover:text-gray-700"
                    >
                        X
                    </button>

                </div>


                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    
                    <div className="flex flex-col gap-2">

                        <label
                            htmlFor="amount"
                            className="text-sm font-semibold text-gray-700"
                        >
                            Amount
                        </label>

                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-gray-300
                                       bg-white px-4 py-3 outline-none
                                       focus:border-teal-600
                                       focus:ring-2 focus:ring-teal-600/20"
                        />

                    </div>


                    
                    <div className="flex flex-col gap-2">

                        <label
                            htmlFor="description"
                            className="text-sm font-semibold text-gray-700"
                        >
                            Description
                        </label>

                        <input
                            type="text"
                            id="description"
                            name="description"
                            placeholder="Dinner with friends"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-gray-300
                                       bg-white px-4 py-3 outline-none
                                       focus:border-teal-600
                                       focus:ring-2 focus:ring-teal-600/20"
                        />

                    </div>


                   
                    <div className="flex flex-col gap-2">

                        <label
                            htmlFor="category"
                            className="text-sm font-semibold text-gray-700"
                        >
                            Category
                        </label>

                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300
                                       bg-white px-4 py-3 outline-none
                                       focus:border-teal-600
                                       focus:ring-2 focus:ring-teal-600/20"
                        >
                            <option value="Food">Food</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Bills">Bills</option>
                            <option value="Other">Other</option>
                        </select>

                    </div>


                   
                    <div className="flex flex-col gap-2">

                        <label
                            htmlFor="expense_date"
                            className="text-sm font-semibold text-gray-700"
                        >
                            Date
                        </label>

                        <input
                            type="date"
                            id="expense_date"
                            name="expense_date"
                            value={formData.expense_date}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300
                                       bg-white px-4 py-3 outline-none
                                       focus:border-teal-600
                                       focus:ring-2 focus:ring-teal-600/20"
                        />

                    </div>


                    
                    <div className="flex gap-3 pt-2">

                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-xl border
                                       border-gray-200 px-4 py-3
                                       font-semibold text-gray-700
                                       transition hover:bg-gray-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 rounded-xl bg-teal-900
                                       px-4 py-3 font-semibold text-white
                                       transition hover:bg-teal-800
                                       disabled:cursor-not-allowed
                                       disabled:opacity-60"
                        >
                            {loading ? "Adding..." : "Add Expense"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default AddExpenseModal;

