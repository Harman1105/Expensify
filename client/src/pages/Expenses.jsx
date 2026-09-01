import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import AddExpenseModal from "../components/AddExpenseModal";
import PieChart from "../components/PieChart";
import ExpenseDetailsModal from "../components/ExpenseDetailsModal";
import MonthlyChart from "../components/MonthlyChart";

const Expenses = () => {

  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
        totalExpenses: 0,
        totalPages: 0
        });
  const [refresh, setRefresh] = useState(false);
  const [categorySummary, setCategorySummary] = useState([]);
const [selectedExpense, setSelectedExpense] = useState(null);
const [showExpenseModal, setShowExpenseModal] = useState(false);
const [monthlySummary, setMonthlySummary] = useState([]);

    const totalExpense = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
);

const handleExpenseAdded = () => {
    setShowAddModal(false);
    setRefresh((prev) => !prev);
};


    useEffect(() => {

    const fetchCategorySummary = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/expenses/category-summary`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
    
            setCategorySummary(response.data.summary);

        } catch (error) {

            console.error(
                "Error fetching category summary:",
                error
            );

        }
    };

   
    fetchCategorySummary();

}, []);

     useEffect(() => {

        const fetchExpenses = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/expenses`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                         params: {
                    category: category || undefined,
                    sort,
                    page,
                    limit : 4
                }
                    }
                );

                setExpenses(response.data.expenses);
                
                setPagination(response.data.pagination);

            } catch (error) {

                console.error("Error fetching expenses:", error);

            } finally {

                setLoading(false);

            }
        };

        fetchExpenses();
    }, [category,sort,page,refresh]);

    useEffect(() => {

    const fetchMonthlySummary = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/expenses/monthly-summary`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMonthlySummary(response.data.summary);

        } catch (error) {

            console.error(
                "Error fetching monthly summary:",
                error
            );

        }
    };

    fetchMonthlySummary();

}, [refresh]);


      if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-gray-500">
                    Loading expenses...
                </p>
            </div>
        );
    }

    const handleExpenseClick = async (id) => {

    try {

        const token = localStorage.getItem("token");

        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/expenses/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setSelectedExpense(response.data.expense);
        setShowExpenseModal(true);

    } catch (error) {

        console.error("Error fetching expense:", error);

    }
};

const handleDeleteExpense = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) return;

    try {

        const token = localStorage.getItem("token");

        await axios.delete(
            `${import.meta.env.VITE_API_URL}/api/expenses/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setShowExpenseModal(false);
        setSelectedExpense(null);

        // Fetch the updated list
        setRefresh((prev) => !prev);

    } catch (error) {

        console.error("Error deleting expense:", error);

    }
};


    return (
        <div className="space-y-8">

            
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Expenses
                </h1>

                <p className="mt-1 text-gray-500">
                    Keep track of where your money goes.
                </p>
            </div>


            
            <div className="rounded-2xl bg-teal-900 p-7 text-white shadow-sm">

                <p className="text-sm font-medium text-teal-200">
                    Your total expenditure
                </p>

                <h2 className="mt-2 text-4xl font-bold">
    ₹{totalExpense}
</h2>

                <p className="mt-2 text-sm text-teal-200">
                    This month
                </p>

            </div>


            
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                
                <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">

                    <div className="mb-6 flex items-center justify-between">

                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                Recent expenses
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Your latest transactions
                            </p>
                        </div>

                        <button
    onClick={() => setShowAddModal(true)}
    className="rounded-xl bg-teal-900 px-5 py-2.5
               text-sm font-semibold text-white
               transition hover:bg-teal-800"
>
    + Add Expense
</button>

                    </div>


                    
                    <div className="mb-5 flex gap-3">

                      <select
    value={category}
    onChange={(e) => {setCategory(e.target.value)
        setPage(1);
    }
    }
    className="rounded-xl border border-gray-200
               bg-gray-50 px-4 py-2.5 text-sm
               outline-none focus:border-teal-600"
>
    <option value="">All categories</option>
    <option value="Food">Food</option>
    <option value="Petrol">Petrol</option>
    <option value="Shopping">Shopping</option>
    <option value="Bills">Bills</option>
</select>

                       <select
    value={sort}
    onChange={(e) => {setSort(e.target.value)
        setPage(1)
    }}
    className="rounded-xl border border-gray-200
               bg-gray-50 px-4 py-2.5 text-sm
               outline-none focus:border-teal-600"
>
    <option value="latest">Latest first</option>
    <option value="oldest">Oldest first</option>
    <option value="highest">Highest amount</option>
    <option value="lowest">Lowest amount</option>
</select>

                    </div>


            
                    <div className="divide-y divide-gray-100">

                        {expenses.map((expense) => (

                            <div
                                key={expense.id}
                                onClick={() => handleExpenseClick(expense.id)}
                                className="flex cursor-pointer items-center
                                           justify-between py-5
                                           transition hover:bg-gray-50"
                            >

                                <div className="flex items-center gap-4">

                                    <div
                                        className="flex h-11 w-11 items-center
                                                   justify-center rounded-xl
                                                   bg-teal-50 text-lg"
                                    >
                                        {expense.category === "Food"
                                            ? "🍔"
                                            : expense.category === "Petrol"
                                                ? "⛽"
                                                : "🛍️"
                                        }
                                    </div>

                                    <div>

                                        <p className="font-semibold text-gray-900">
                                            {expense.description}
                                        </p>

                                        <p className="mt-1 text-sm text-gray-500">
                                            {expense.category} : {expense.expense_date  }
                                        </p> 

                                    </div>

                                </div>


                                <p className="font-bold text-gray-900">
                                    ₹{Number(expense.amount)}
                                </p>

                            </div>

                        ))}

                    </div>

                    {showExpenseModal && (
    <ExpenseDetailsModal
        expense={selectedExpense}
        onClose={() => {
            setShowExpenseModal(false);
            setSelectedExpense(null);
        }}
        onDelete={handleDeleteExpense}
    />
)}


                    
                    <div className="mt-5 flex items-center justify-between
                                    border-t border-gray-100 pt-5">

                        <p className="text-sm text-gray-500">
                            Page {page} of {pagination.totalPages}
                        </p>

                        <div className="flex gap-2">

    <button
        disabled={page === 1}
        onClick={() => setPage((prev) => prev - 1)}
        className="rounded-lg border border-gray-200
                   px-3 py-2 text-sm
                   hover:bg-gray-50
                   disabled:cursor-not-allowed
                   disabled:opacity-40"
    >
        ←
    </button>


    {Array.from(
        { length: pagination.totalPages },
        (_, index) => index + 1
    ).map((pageNumber) => (

        <button
            key={pageNumber}
            onClick={() => setPage(pageNumber)}
            className={`rounded-lg px-3 py-2 text-sm
                ${
                    page === pageNumber
                        ? "bg-teal-900 text-white"
                        : "border border-gray-200 hover:bg-gray-50"
                }`}
        >
            {pageNumber}
        </button>

    ))}


    <button
        disabled={page === pagination.totalPages}
        onClick={() => setPage((prev) => prev + 1)}
        className="rounded-lg border border-gray-200
                   px-3 py-2 text-sm
                   hover:bg-gray-50
                   disabled:cursor-not-allowed
                   disabled:opacity-40"
    >
        →
    </button>

</div>

                    </div>

                    {showAddModal && (
    <AddExpenseModal
        onClose={() => setShowAddModal(false)}
        onExpenseAdded={handleExpenseAdded}
    />
)}

                </div>


                {/* Category chart placeholder */}
                <div className="rounded-2xl bg-white p-6 shadow-sm">

                    <h2 className="text-xl font-bold text-gray-900">
                        Spending by category
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Where your money is going
                    </p>

                    <div className=" flex h-full justify-center items-center ">
                        <PieChart data={categorySummary} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Expenses;