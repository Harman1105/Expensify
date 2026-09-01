import React, { useState } from "react";
import axios from "axios";

const CreateGoalModal = ({ onClose, onGoalCreated }) => {

    const [formData, setFormData] = useState({
        name: "",
        target_amount: "",
        target_date: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/savings`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            onGoalCreated(response.data.goal);

            onClose();

        } catch (error) {

            console.error("Error creating savings goal:", error);

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

                <div className="mb-6 flex items-center justify-between">

                    <h2 className="text-xl font-bold text-gray-900">
                        Create savings goal
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-xl text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>

                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>

                        <label className="text-sm font-medium text-gray-700">
                            Goal name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. New Laptop"
                            required
                            className="mt-2 w-full rounded-xl border border-gray-200
                                       px-4 py-3 outline-none
                                       focus:border-teal-600"
                        />

                    </div>

                    <div>

                        <label className="text-sm font-medium text-gray-700">
                            Target amount
                        </label>

                        <input
                            type="number"
                            name="target_amount"
                            value={formData.target_amount}
                            onChange={handleChange}
                            placeholder="60000"
                            min="1"
                            required
                            className="mt-2 w-full rounded-xl border border-gray-200
                                       px-4 py-3 outline-none
                                       focus:border-teal-600"
                        />

                    </div>

                    <div>

                        <label className="text-sm font-medium text-gray-700">
                            Target date
                        </label>

                        <input
                            type="date"
                            name="target_date"
                            value={formData.target_date}
                            onChange={handleChange}
                            required
                            className="mt-2 w-full rounded-xl border border-gray-200
                                       px-4 py-3 outline-none
                                       focus:border-teal-600"
                        />

                    </div>

                    <div className="flex gap-3 pt-2">

                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-xl border border-gray-200
                                       px-4 py-3 font-semibold
                                       hover:bg-gray-50"
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
                            {loading ? "Creating..." : "Create goal"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default CreateGoalModal;