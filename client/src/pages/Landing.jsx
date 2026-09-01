
import { useNavigate } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-teal-950 text-white">

            {/* Navbar */}
            <nav className="flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6 md:px-10">

                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                    EXPENSIFY
                </h1>

                <div className="flex gap-2 sm:gap-4">

                    <button
                        onClick={() => navigate("/login")}
                        className="rounded-xl px-3 py-2 text-sm font-semibold
                                   hover:bg-white/10 transition
                                   sm:px-5 sm:py-2.5 sm:text-base"
                    >
                        Login
                    </button>

                    <button
                        onClick={() => navigate("/signup")}
                        className="rounded-xl bg-yellow-400 px-3 py-2
                                   text-sm font-semibold text-teal-950
                                   hover:bg-yellow-300 transition
                                   sm:px-5 sm:py-2.5 sm:text-base"
                    >
                        Get Started
                    </button>

                </div>

            </nav>


            {/* Hero Section */}
            <main className="flex min-h-[calc(100vh-80px)] items-center
                             justify-center px-5 sm:px-8 md:px-10">

                <div className="max-w-4xl text-center">

                    {/* Badge */}
                    <div className="mb-5 inline-block rounded-full
                                    border border-teal-700 bg-teal-900
                                    px-3 py-1.5 text-xs text-teal-200
                                    sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
                        Your money. Your control.
                    </div>


                    {/* Heading */}
                    <h2 className="text-4xl font-bold leading-tight
                                   sm:text-5xl
                                   md:text-6xl
                                   lg:text-7xl">
                        Take control of
                        <span className="block text-yellow-400">
                            your expenses.
                        </span>
                    </h2>


                    {/* Description */}
                    <p className="mx-auto mt-5 max-w-2xl text-base
                                  leading-7 text-teal-100
                                  sm:mt-7 sm:text-lg sm:leading-8">
                        Track your spending, understand your habits,
                        and manage your finances without the spreadsheet
                        headache.
                    </p>


                    {/* Buttons */}
                    <div className="mt-8 flex flex-col items-center
                                    justify-center gap-3
                                    sm:mt-10 sm:flex-row sm:gap-4">

                        <button
                            onClick={() => navigate("/signup")}
                            className="w-full rounded-2xl bg-yellow-400
                                       px-6 py-3.5 font-bold text-teal-950
                                       hover:bg-yellow-300 transition
                                       sm:w-auto sm:px-8 sm:py-4"
                        >
                            Start Managing →
                        </button>

                        <button
                            onClick={() => navigate("/login")}
                            className="w-full rounded-2xl border border-teal-600
                                       px-6 py-3.5 font-semibold
                                       hover:bg-teal-900 transition
                                       sm:w-auto sm:px-8 sm:py-4"
                        >
                            I already have an account
                        </button>

                    </div>

                </div>

            </main>

        </div>
    );
};

export default Landing;

