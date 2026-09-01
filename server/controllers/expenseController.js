import pool from "../database/db.js"

export const getExpenses = async (req, res) => {
    try {

        const {
            category,
            startDate,
            endDate,
            page = 1,
            limit = 10,
            sort = "latest"
        } = req.query;

        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        let orderBy = "expense_date DESC";

if (sort === "oldest") {
    orderBy = "expense_date ASC";
}

if (sort === "highest") {
    orderBy = "amount DESC";
}

if (sort === "lowest") {
    orderBy = "amount ASC";
}

        const offset = (pageNumber - 1) * limitNumber;

        let whereClause = `
            WHERE user_id = $1
        `;

        const values = [req.user.userId];
        let paramIndex = 2;


        // Category filter
        if (category) {
            whereClause += ` AND category = $${paramIndex}`;
            values.push(category);
            paramIndex++;
        }


        // Start date filter
        if (startDate) {
            whereClause += ` AND expense_date >= $${paramIndex}`;
            values.push(startDate);
            paramIndex++;
        }


        // End date filter
        if (endDate) {
            whereClause += ` AND expense_date <= $${paramIndex}`;
            values.push(endDate);
            paramIndex++;
        }


    
       const expenseQuery = `
    SELECT *
    FROM expenses
    ${whereClause}
    ORDER BY ${orderBy}
    LIMIT $${paramIndex}
    OFFSET $${paramIndex + 1}
`;

        const expenseValues = [
            ...values,
            limitNumber,
            offset
        ];

        const result = await pool.query(
            expenseQuery,
            expenseValues
        );


        
        const countQuery = `
            SELECT COUNT(*) AS total
            FROM expenses
            ${whereClause}
        `;

        const countResult = await pool.query(
            countQuery,
            values
        );

        const totalExpenses = Number(
            countResult.rows[0].total
        );

        const totalPages = Math.ceil(
            totalExpenses / limitNumber
        );


        res.status(200).json({
            expenses: result.rows,
            pagination: {
                page: pageNumber,
                limit: limitNumber,
                totalExpenses,
                totalPages
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch expenses"
        });
    }
};

export const createExpense = async (req, res) => {
    try {

        const {
            amount,
            description,
            category,
            expenseDate
        } = req.body;

        if (!amount || !description || !category) {
            return res.status(400).json({
                message: "Amount, description and category are required"
            });
        }

        const result = await pool.query(
            `INSERT INTO expenses
                (user_id, amount, description, category, expense_date)
             VALUES ($1, $2, $3, $4, COALESCE($5, CURRENT_DATE))
             RETURNING *`,
            [
                req.user.userId,
                amount,
                description,
                category,
                expenseDate || null
            ]
        );

        res.status(201).json({
            message: "Expense created successfully",
            expense: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create expense"
        });
    }
};

export const getExpenseById = async (req, res) => {
    try {

        const { id } = req.params;

        const result = await pool.query(
            `SELECT *
             FROM expenses
             WHERE id = $1 AND user_id = $2`,
            [id, req.user.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.status(200).json({
            expense: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch expense"
        });
    }
};

export const updateExpense = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            amount,
            description,
            category,
            expenseDate
        } = req.body;

        if (!amount || !description || !category) {
            return res.status(400).json({
                message: "Amount, description and category are required"
            });
        }

        const result = await pool.query(
            `UPDATE expenses
             SET
                amount = $1,
                description = $2,
                category = $3,
                expense_date = $4
             WHERE id = $5 AND user_id = $6
             RETURNING *`,
            [
                amount,
                description,
                category,
                expenseDate,
                id,
                req.user.userId
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.status(200).json({
            message: "Expense updated successfully",
            expense: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to update expense"
        });
    }
};

export const deleteExpense = async (req, res) => {
    try {

        const { id } = req.params;

        const result = await pool.query(
            `DELETE FROM expenses
             WHERE id = $1 AND user_id = $2
             RETURNING id`,
            [id, req.user.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        res.status(200).json({
            message: "Expense deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete expense"
        });
    }
};

export const getCategorySummary = async (req, res) => {
    try {

        const query = `
            SELECT category, SUM(amount) AS total
            FROM expenses
            WHERE user_id = $1
            GROUP BY category
            ORDER BY total DESC
        `;

        const result = await pool.query(
            query,
            [req.user.userId]
        );

        res.status(200).json({
            summary: result.rows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch category summary"
        });
    }
};

export const getMonthlySummary = async (req, res) => {

    try {

        const query = `
            SELECT
                DATE_TRUNC('month', expense_date) AS month,
                SUM(amount) AS total
            FROM expenses
            WHERE user_id = $1
            GROUP BY DATE_TRUNC('month', expense_date)
            ORDER BY month ASC
        `;

        const result = await pool.query(
            query,
            [req.user.userId]
        );

        res.status(200).json({
            summary: result.rows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch monthly summary"
        });
    }
};