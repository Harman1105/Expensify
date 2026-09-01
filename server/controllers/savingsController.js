import pool from "../database/db.js";


export const createSavingsGoal = async (req, res) => {

    try {

        const {
            name,
            target_amount,
            target_date
        } = req.body;

        if (!name || !target_amount) {
            return res.status(400).json({
                message: "Name and target amount are required"
            });
        }

        const result = await pool.query(
            `
            INSERT INTO savings_goals
            (user_id, name, target_amount, target_date)
            VALUES ($1, $2, $3, $4)
            RETURNING *
            `,
            [
                req.user.userId,
                name,
                target_amount,
                target_date || null
            ]
        );

        res.status(201).json({
            message: "Savings goal created",
            goal: result.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to create savings goal"
        });
    }
};




export const getSavingsGoals = async (req, res) => {

    try {

        const result = await pool.query(
            `
            SELECT *
            FROM savings_goals
            WHERE user_id = $1
            ORDER BY created_at DESC
            `,
            [req.user.userId]
        );

        res.status(200).json({
            goals: result.rows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch savings goals"
        });
    }
};

export const addSavingsContribution = async (req, res) => {

    try {

        const { id } = req.params;
        const { amount } = req.body;

        
        if (!amount || Number(amount) <= 0) {
            return res.status(400).json({
                message: "Amount must be greater than 0"
            });
        }

        
        const goalResult = await pool.query(
            `
            SELECT *
            FROM savings_goals
            WHERE id = $1
            AND user_id = $2
            `,
            [id, req.user.userId]
        );

        if (goalResult.rows.length === 0) {
            return res.status(404).json({
                message: "Savings goal not found"
            });
        }

        const goal = goalResult.rows[0];

      
        const newSavedAmount =
            Number(goal.saved_amount) + Number(amount);

        if (newSavedAmount > Number(goal.target_amount)) {
            return res.status(400).json({
                message: "Contribution exceeds target amount"
            });
        }

       
        await pool.query(
            `
            INSERT INTO savings_contributions
            (goal_id, amount)
            VALUES ($1, $2)
            `,
            [id, amount]
        );

       
        const updatedGoal = await pool.query(
            `
            UPDATE savings_goals
            SET saved_amount = $1
            WHERE id = $2
            RETURNING *
            `,
            [newSavedAmount, id]
        );

        res.status(200).json({
            message: "Contribution added",
            goal: updatedGoal.rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to add contribution"
        });
    }
};