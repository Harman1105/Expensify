import pool  from "../database/db.js";

export const getDashboard = async (req, res) => {

    try {

        const userId = req.user.userId;


        // Total spent

        const expenseResult = await pool.query(
            `
            SELECT COALESCE(SUM(amount), 0) AS total
            FROM expenses
            WHERE user_id = $1
            `,
            [userId]
        );


        // Total saved

        const savingsResult = await pool.query(
            `
            SELECT COALESCE(SUM(saved_amount), 0) AS total
            FROM savings_goals
            WHERE user_id = $1
            `,
            [userId]
        );


        // Recent expenses

        const recentExpensesResult = await pool.query(
            `
            SELECT *
            FROM expenses
            WHERE user_id = $1
            ORDER BY expense_date DESC
            LIMIT 5
            `,
            [userId]
        );


        // Savings goals

        const goalsResult = await pool.query(
            `
            SELECT *
            FROM savings_goals
            WHERE user_id = $1
            ORDER BY created_at DESC
            `,
            [userId]
        );


        // Category summary

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


        const totalSpent =
            Number(expenseResult.rows[0].total);

        const totalSaved =
            Number(savingsResult.rows[0].total);


        const totalMoney =
            totalSpent + totalSaved;


        const savingsRate =
            totalMoney > 0
                ? Number(((totalSaved / totalMoney) * 100).toFixed(1))
                : 0;


        res.status(200).json({

            totalSpent,

            totalSaved,

            savingsRate,

            recentExpenses:
                recentExpensesResult.rows,

            savingsGoals:
                goalsResult.rows,

            categorySummary:
                categoryResult.rows

        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch dashboard data"
        });

    }

};