import * as dotenv from 'dotenv';

dotenv.config();

interface EnvVariables {
    PORT: number;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    NODE_ENV: string;
    DATABASE_URL: string;
    PROD_BASE_URL : string;
};

const getEnvVariables = (): EnvVariables => {
    return {
        PORT: parseInt(process.env.PORT as string, 10) || 8080,
        DB_NAME: process.env.DB_NAME as string,
        DB_USER: process.env.DB_USER as string,
        DB_PASSWORD: process.env.DB_PASSWORD as string,
        NODE_ENV: process.env.NODE_ENV as string || "development",
        DATABASE_URL: process.env.DATABASE_URL as string,
        PROD_BASE_URL: process.env.PROD_BASE_URL as string,
    };
};
  
export const environment = getEnvVariables();
  