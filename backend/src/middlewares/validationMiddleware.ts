import { Request, Response, NextFunction } from "express";
import { ZodSchema } from 'zod';
import { RequestBodyTypes } from "../types/requestBodyTypes";

export const validateRequestBody = (schema : ZodSchema<RequestBodyTypes>) => {
    return (req : Request, res : Response, next: NextFunction ) => {

        const result = schema.safeParse(req.body);

        if (!result.success) {
            console.log(`Validation failed on route: ${JSON.stringify(req.route.path)}`);
            return res.status(400).json({
                message: `Validation failed on route: ${JSON.stringify(req.route.path)}`,
                errors: result.error.errors,
            });
        }
        
        req.body = result.data;
        
        next();
    };
};