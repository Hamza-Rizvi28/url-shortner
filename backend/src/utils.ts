import { createHash } from 'crypto';
import { DEV_BASE_URL, PROD_BASE_URL } from './constants';
import { environment } from './config';
import jwt from 'jsonwebtoken';
import { UserPayload } from './types/requestBodyTypes';

export const calculateHashedUrl = (longUrl: string) => {
    return createHash('md5').update(longUrl).digest('hex').toString();
};

export const baseUrl = environment.NODE_ENV === 'development' ? DEV_BASE_URL : PROD_BASE_URL;

// Utility function to generate tokens
export const generateJwtAccessToken = (user : UserPayload) => {
    return jwt.sign({ id: user.id, email: user.email }, environment.JWT_ACCESS_SECRET, { expiresIn: '15m' });
};

export const generateJwtRefreshToken = (user : UserPayload) => {
    return jwt.sign({ id: user.id }, environment.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

// Verify a JWT
export const verifyJWT = (token: string, secret: string): UserPayload => {
    try {
        return jwt.verify(token, secret) as UserPayload;
    } catch (error) {
        throw new Error('Invalid token');
    }
};