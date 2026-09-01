
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const Layout = ({ children }) => {

    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const tabs = [
        {
            name: "Dashboard",
            path: "/home"
        },
        {
            name: "Expenses",
            path: "/expenses"
        },
        {
            name: "Savings",
            path: "/savings"
        },
        {
            name: "Analytics",
            path: "/analytics"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Navbar */}

            <nav className="border-b border-gray-200 bg-white">

                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 sm:py-5">


                    {/* Logo */}

                    <button
                        onClick={() => navigate("/home")}
                        className="text-2xl font-bold tracking-tight text-teal-900"
                    >
                        EXPENSIFY
                    </button>


                    {/* Desktop Tabs */}

                    <div className="hidden items-center gap-2 md:flex">

                        {tabs.map((tab) => (

                            <NavLink
                                key={tab.path}
                                to={tab.path}
                                className={({ isActive }) =>
                                    `rounded-xl px-5 py-2.5 text-sm font-semibold transition
                                    ${
                                        isActive
                                            ? "bg-teal-900 text-white"
                                            : "text-gray-600 hover:bg-gray-100"
                                    }`
                                }
                            >
                                {tab.name}
                            </NavLink>

                        ))}

                    </div>


                    {/* Desktop Profile */}

                    <button
                        className="hidden h-10 w-10 items-center justify-center
                                   rounded-full bg-teal-100 font-semibold
                                   text-teal-900 md:flex"
                    >
                        H
                    </button>


                    {/* Mobile Menu Button */}

                    <div className="relative md:hidden">

                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="flex h-10 w-10 items-center justify-center
                                       rounded-xl border border-gray-200
                                       text-xl text-gray-700
                                       hover:bg-gray-100 transition"
                        >
                            ☰
                        </button>


                        {/* Mobile Dropdown */}

                        {menuOpen && (

                            <div
                                className="absolute right-0 top-12 z-50 w-48
                                           rounded-xl border border-gray-200
                                           bg-white p-2 shadow-lg"
                            >

                                {tabs.map((tab) => (

                                    <NavLink
                                        key={tab.path}
                                        to={tab.path}
                                        onClick={() => setMenuOpen(false)}
                                        className={({ isActive }) =>
                                            `block rounded-lg px-4 py-3 text-sm
                                             font-semibold transition
                                            ${
                                                isActive
                                                    ? "bg-teal-900 text-white"
                                                    : "text-gray-600 hover:bg-gray-100"
                                            }`
                                        }
                                    >
                                        {tab.name}
                                    </NavLink>

                                ))}


                                {/* Profile */}

                                <div className="my-2 border-t border-gray-100" />

                                <button
                                    className="flex w-full items-center gap-3
                                               rounded-lg px-4 py-3 text-left
                                               text-sm font-semibold
                                               text-gray-600
                                               hover:bg-gray-100"
                                >
                                    <span
                                        className="flex h-8 w-8 items-center
                                                   justify-center rounded-full
                                                   bg-teal-100 text-teal-900"
                                    >
                                        H
                                    </span>

                                    Profile
                                </button>

                            </div>

                        )}

                    </div>

                </div>

            </nav>


            

            <main className="mx-auto max-w-7xl px-5 py-6 sm:px-8 sm:py-8">

                {children}

            </main>

        </div>
    );
};

export default Layout;

