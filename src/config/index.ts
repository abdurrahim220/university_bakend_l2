import dotenv from 'dotenv';
dotenv.config();



export default {
  port: process.env.PORT,
  db_url: process.env.DATABASE_ACCESS,
  NODE_ENV: process.env.NODE_ENV,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  default_pass: process.env.DEFAULT_PASS,
  jwt_access_secret:process.env.JWT_ACCESS_SECRET
};
