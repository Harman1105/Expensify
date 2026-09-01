const ExpenseDetailsModal = ({ expense, onClose, onDelete }) => {

    if (!expense) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

                <div className="flex items-center justify-between">

                    <h2 className="text-2xl font-bold text-gray-900">
                        Expense Details
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-xl text-gray-400 hover:text-gray-700"
                    >
                        ✕
                    </button>

                </div>


                <div className="mt-6 space-y-5">

                    <div>
                        <p className="text-sm text-gray-500">
                            Description
                        </p>

                        <p className="mt-1 font-semibold text-gray-900">
                            {expense.description}
                        </p>
                    </div>


                    <div>
                        <p className="text-sm text-gray-500">
                            Amount
                        </p>

                        <p className="mt-1 text-2xl font-bold text-teal-900">
                            ₹{Number(expense.amount)}
                        </p>
                    </div>


                    <div>
                        <p className="text-sm text-gray-500">
                            Category
                        </p>

                        <p className="mt-1 font-semibold text-gray-900">
                            {expense.category}
                        </p>
                    </div>


                    <div>
                        <p className="text-sm text-gray-500">
                            Expense Date
                        </p>

                        <p className="mt-1 font-semibold text-gray-900">
                            {expense.expense_date}
                        </p>
                    </div>


                    <div>
                        <p className="text-sm text-gray-500">
                            Created At
                        </p>

                        <p className="mt-1 font-semibold text-gray-900">
                            {expense.created_at}
                        </p>
                    </div>

                </div>


               <div className="mt-7 flex gap-3">

    <button
        onClick={onClose}
        className="flex-1 rounded-xl border border-gray-200
                   px-4 py-3 font-semibold text-gray-700
                   hover:bg-gray-50"
    >
        Close
    </button>

    <button
        onClick={() => onDelete(expense.id)}
        className="flex-1 rounded-xl bg-red-600
                   px-4 py-3 font-semibold text-white
                   hover:bg-red-700"
    >
        Delete
    </button>

</div>

            </div>

        </div>
    );
};

export default ExpenseDetailsModal;