import dotenv from "dotenv";
dotenv.config();
export default {
    port: process.env.PORT,
    db_url: process.env.DATABASE_ACCESS,
    NODE_ENV:process.env.NODE_ENV,
  };