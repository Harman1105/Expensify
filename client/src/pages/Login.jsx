import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
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
    `${import.meta.env.VITE_API_URL}/api/auth/login`,
    formData
);

            const { token } = response.data;

            localStorage.setItem("token", token);

            console.log("Login successful:", response.data);

            navigate("/home");

        } catch (error) {
            console.error("Login error:", error);

            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="min-h-screen bg-teal-950 flex items-center justify-center px-6">

            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="mb-8 text-center">

                    <button
                        onClick={() => navigate("/")}
                        className="text-2xl font-bold text-white"
                    >
                        EXPENSIFY
                    </button>

                    <p className="mt-3 text-teal-200">
                        Welcome back. Let's get you in.
                    </p>

                </div>


                {/* Login Card */}
                <div className="rounded-3xl bg-white p-8 shadow-2xl">

                    <div className="mb-8">

                        <h2 className="text-3xl font-bold text-gray-900">
                            Welcome back
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Login to continue managing your expenses.
                        </p>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Email */}
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


                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-teal-800 py-3.5
                                       font-semibold text-white
                                       transition hover:bg-teal-900"
                        >
                            Login
                        </button>

                    </form>


                    {/* Signup */}
                    <p className="mt-6 text-center text-sm text-gray-500">

                        Don't have an account?

                        <button
                            type="button"
                            onClick={() => navigate("/signup")}
                            className="ml-1 font-semibold text-teal-700
                                       hover:text-teal-900 hover:underline"
                        >
                            Create one
                        </button>

                    </p>

                </div>

            </div>

        </div>
    );
};

export default Login;