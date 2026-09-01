    import express from 'express'
    import 'dotenv/config'
    import authRoutes from './routes/authRoutes.js'
    import expenseRoutes from './routes/expenseRoutes.js'
    import savingsRoutes from "./routes/savingsRoutes.js";
    import analyticsRoutes from "./routes/analyticsRoutes.js";
    import dashboardRoutes from './routes/dashboardRoutes.js'
    import cors from "cors";

    import pool from './database/db.js'


    const app = express()
    const PORT = process.env.PORT || 3000
    app.use(cors());    
    app.use(express.json());

    app.get("/", async (req, res) => {
        try {
            const result = await pool.query("SELECT NOW()");
            res.json({
                message: "Database connected!",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Database connection failed"
            });
        }
    });

    app.use('/api/auth', authRoutes)
    app.use('/api/expenses', expenseRoutes)
    app.use("/api/savings", savingsRoutes);
    app.use("/api/analytics", analyticsRoutes);
    app.use("/api/dashboard", dashboardRoutes);

    app.listen(PORT, ()=>{
        console.log(`App is running on port ${PORT}`)
    })