import bcrypt from "bcrypt";
import pool from "../database/db.js";
import { generateToken } from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            password,
            confirmPassword
        } = req.body;

        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
    return res.status(400).json({
        message: "All fields are required"
    });
}

        if (password !== confirmPassword) {
        return res.status(400).json({
        message: "Passwords do not match"
    });
}

        const existingUser = await pool.query(
    `SELECT id
     FROM users
     WHERE email = $1 OR phone = $2`,
    [email, phone]
);

    if (existingUser.rows.length > 0) {
    return res.status(409).json({
        message: "Email or phone number already registered"
    });
}


        const passwordHash = await bcrypt.hash(password, 10);

        
        const result = await pool.query(
            `INSERT INTO users
            (first_name, last_name, email, phone, password_hash)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, first_name, last_name, email, phone, created_at`,
            [
                firstName,
                lastName,
                email,
                phone,
                passwordHash
            ]
        );
        
        const token = generateToken(result.rows[0].id)

        res.status(201).json({
            message: "Account created successfully",
            user: result.rows[0],
            token
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        
        const result = await pool.query(
            `SELECT id, first_name, last_name, email, phone, password_hash
             FROM users
             WHERE email = $1`,
            [email]
        );

        
        if (result.rows.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = result.rows[0];

        
        const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

    
        const token = generateToken(user.id);

    
        delete user.password_hash;

       
        res.status(200).json({
            message: "Login successful",
            user,
            token
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
};