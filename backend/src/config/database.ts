import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// ✅ Ensure dialect is always explicitly set
const dialect: any = "postgres"; // Hardcoded to avoid env issues

const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST,
        dialect, // ✅ Now dialect is explicitly set
        logging: false,
    }
);

export default sequelize;
