import { Router, Request, Response } from 'express';
import { createUser, getUserByEmail } from '../models/user.model';
import { generateJwtAccessToken, generateJwtRefreshToken, verifyJWT } from '../utils';
import { HTTP_STATUS } from '../constants';
import { environment } from '../config';
import bcrypt from 'bcrypt';
import prisma from '../models/prisma';

const router = Router();

router.post('/auth/signup', async (request : Request, response : Response) => {
    try {
        const { email, username, password } = request.body;

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return response.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser(email, username, hashedPassword);
        response.status(HTTP_STATUS.CREATED).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error(error);
        response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong!' });
    }
});

router.post('/auth/login', async (request : Request, response : Response) => {
    try {
        const { email, password } = request.body;

        const user = await prisma.user.findUnique({ where : { email } });
        if (!user) {
            return response.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Invalid email or password' });
        }

        const isPasswordSame = await bcrypt.compare(password, user.password);
        if (!isPasswordSame) {
            return response.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Invalid email or password' });
        }

        const userForSigning = { id: user.id, email: user.email };
        const accessToken = generateJwtAccessToken(userForSigning);
        const refreshToken = generateJwtRefreshToken(userForSigning);

        response.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: environment.NODE_ENV !== 'development',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        response.status(200).json({
            message: 'Login successful',
            accessToken,
            user: { id: user.id, email: user.email, name: user.username },
        });
    }
    catch (error) {
        console.error(error);
        response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong!' });
    }
});

router.post('/auth/refresh', (request: Request, response: Response) => {
    const refreshToken = request.cookies.refreshToken;

    if (!refreshToken) {
        response.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'No refresh token' });
    }

    try {
        const decoded = verifyJWT(refreshToken, environment.JWT_REFRESH_SECRET);
        if (decoded) {
            const newAccessToken = generateJwtAccessToken({ id: decoded.id, email: decoded.email });
            console.log(newAccessToken);
            response.status(HTTP_STATUS.OK).json({ accessToken: newAccessToken });
        }
        response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong!' });
    } catch (error) {
        console.error(error);
        return response.status(HTTP_STATUS.FORBIDDEN).json({ message: 'Invalid refresh token' });
    }
});

export default router;