import * as dotenv from 'dotenv';

dotenv.config();

interface EnvVariables {
    PORT: number;
    NODE_ENV: string;
    DATABASE_URL: string;
    PROD_BASE_URL : string;
    JWT_ACCESS_SECRET : string;
    JWT_REFRESH_SECRET : string;    
};

const getEnvVariables = (): EnvVariables => {
    return {
        PORT: parseInt(process.env.PORT as string, 10) || 8080,
        NODE_ENV: process.env.NODE_ENV as string || "development",
        DATABASE_URL: process.env.DATABASE_URL as string,
        PROD_BASE_URL: process.env.PROD_BASE_URL as string,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    };
};

const requiredEnvVars: string[] = [
    "PORT",
    "NODE_ENV",
    "DATABASE_URL",
    // "PROD_BASE_URL", //required if environment production
    "JWT_ACCESS_SECRET",
    "JWT_REFRESH_SECRET",
];

const missingEnvVars = requiredEnvVars.filter((key) => {
    const value = process.env[key];
    return value === undefined || value.trim() === "";
});

if (missingEnvVars.length > 0) {
    console.error(`Missing or empty required environment variables: ${missingEnvVars.join(", ")}`);
    process.exit(1);
}

export const environment = getEnvVariables();
  