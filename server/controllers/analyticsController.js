import pool from "../database/db.js";

export const getAnalytics = async (req, res) => {

    try {

        const userId = req.user.userId;

        // Total spending
        const totalSpentResult = await pool.query(
            `
            SELECT COALESCE(SUM(amount), 0) AS total
            FROM expenses
            WHERE user_id = $1
            `,
            [userId]
        );


        // Spending by category
        const categoryResult = await pool.query(
            `
            SELECT
                category,
                SUM(amount) AS total
            FROM expenses
            WHERE user_id = $1
            GROUP BY category
            ORDER BY total DESC
            `,
            [userId]
        );


        // Monthly spending
        const monthlyResult = await pool.query(
            `
            SELECT
                DATE_TRUNC('month', expense_date) AS month,
                SUM(amount) AS total
            FROM expenses
            WHERE user_id = $1
            GROUP BY DATE_TRUNC('month', expense_date)
            ORDER BY month ASC
            `,
            [userId]
        );


        // Highest expense
        const highestExpenseResult = await pool.query(
            `
            SELECT *
            FROM expenses
            WHERE user_id = $1
            ORDER BY amount DESC
            LIMIT 1
            `,
            [userId]
        );


        // Average expense
        const averageExpenseResult = await pool.query(
            `
            SELECT COALESCE(AVG(amount), 0) AS average
            FROM expenses
            WHERE user_id = $1
            `,
            [userId]
        );


        // Total saved
        const totalSavedResult = await pool.query(
            `
            SELECT COALESCE(SUM(saved_amount), 0) AS total
            FROM savings_goals
            WHERE user_id = $1
            `,
            [userId]
        );


        const totalSpent = Number(
            totalSpentResult.rows[0].total
        );

        const totalSaved = Number(
            totalSavedResult.rows[0].total
        );


        // Savings rate
        const savingsRate =
            totalSpent + totalSaved > 0
                ? (totalSaved / (totalSpent + totalSaved)) * 100
                : 0;


        res.status(200).json({

            totalSpent,

            totalSaved,

            savingsRate: Number(savingsRate.toFixed(2)),

            categorySummary:
                categoryResult.rows,

            monthlySummary:
                monthlyResult.rows,

            highestExpense:
                highestExpenseResult.rows[0] || null,

            averageExpense:
                Number(
                    averageExpenseResult.rows[0].average
                )

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch analytics"
        });

    }
};