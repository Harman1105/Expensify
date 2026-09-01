import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

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
            const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/signup`,
    formData
);

            const { token } = response.data;

            localStorage.setItem("token", token);

            console.log("Signup successful:", response.data);

            navigate("/home");

        } catch (error) {
            console.error("Signup error:", error);

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-teal-950 flex items-center justify-center px-6 py-10">

            <div className="w-full max-w-2xl">

                {/* Logo */}
                <div className="mb-8 text-center">
                    <button
                        onClick={() => navigate("/")}
                        className="text-2xl font-bold text-white"
                    >
                        EXPENSIFY
                    </button>

                    <p className="mt-3 text-teal-200">
                        Start taking control of your expenses.
                    </p>
                </div>


                {/* Card */}
                <div className="rounded-3xl bg-white p-8 shadow-2xl">

                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Create your account
                        </h2>

                        <p className="mt-2 text-gray-500">
                            It only takes a minute to get started.
                        </p>
                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* First + Last Name */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                            <div>
                                <label
                                    htmlFor="firstName"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Harman"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-gray-300
                                               px-4 py-3 outline-none transition
                                               focus:border-teal-600
                                               focus:ring-2 focus:ring-teal-600/20"
                                />
                            </div>


                            <div>
                                <label
                                    htmlFor="lastName"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Singh"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-gray-300
                                               px-4 py-3 outline-none transition
                                               focus:border-teal-600
                                               focus:ring-2 focus:ring-teal-600/20"
                                />
                            </div>

                        </div>


                        {/* Email + Phone */}
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Email
                                </label>

                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-gray-300
                                               px-4 py-3 outline-none transition
                                               focus:border-teal-600
                                               focus:ring-2 focus:ring-teal-600/20"
                                />
                            </div>


                            <div>
                                <label
                                    htmlFor="phone"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="+91 XXXXX XXXXX"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-gray-300
                                               px-4 py-3 outline-none transition
                                               focus:border-teal-600
                                               focus:ring-2 focus:ring-teal-600/20"
                                />
                            </div>

                        </div>


                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >
                                Password
                            </label>

                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-gray-300
                                           px-4 py-3 outline-none transition
                                           focus:border-teal-600
                                           focus:ring-2 focus:ring-teal-600/20"
                            />
                        </div>


                        {/* Confirm Password */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-gray-300
                                           px-4 py-3 outline-none transition
                                           focus:border-teal-600
                                           focus:ring-2 focus:ring-teal-600/20"
                            />
                        </div>


                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-teal-800 py-3.5
                                       font-semibold text-white
                                       transition hover:bg-teal-900"
                        >
                            Create Account
                        </button>

                    </form>


                    {/* Login */}
                    <p className="mt-6 text-center text-sm text-gray-500">
                        Already have an account?

                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="ml-1 font-semibold text-teal-700
                                       hover:text-teal-900 hover:underline"
                        >
                            Log in
                        </button>
                    </p>

                </div>

            </div>

        </div>
    );
};

export default SignUp;