import dotenv from "dotenv";
export const JWTTokenKey = "f6k2d92e-6837-1k5h-l83s-uz78381k193w";
export const appUrl = "https://www.recruitertool.com";
dotenv.config();

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME
} = process.env;
