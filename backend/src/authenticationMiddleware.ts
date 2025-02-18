import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from './constants';
import { verifyJWT } from './utils';
import { environment } from './config';

export const authenticateJwt = (request: Request, response: Response, next: NextFunction) => {

    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return response.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1]; // Extract token after "Bearer "

    try {
        const decoded = verifyJWT(token, environment.JWT_ACCESS_SECRET);
        request.user = decoded;
        next();
    } catch (err) {
        return response.status(HTTP_STATUS.FORBIDDEN).json({ message: 'Invalid or expired token.' });
    }
};