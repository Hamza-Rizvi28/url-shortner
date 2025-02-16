import express, { Request, Response, Express } from "express";
import { createShortenedUrlMethod, getLongUrl } from "./controllers/shortenedUrl.controllers";
import { environment } from "./config";
import { CORS_ORIGIN, HTTP_STATUS } from "./constants";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import prisma from "./models/prisma";
import { authenticateJwt } from "./authenticationMiddleware";
import { generateJwtAccessToken, generateJwtRefreshToken, verifyJWT } from "./utils";
import { createUser, getUserByEmail } from "./models/user.model";

const app : Express = express();
const port : number = environment.PORT;
const cors = require('cors');

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: CORS_ORIGIN
}));

app.get("/", (request : Request, response : Response) => {
    response.status(HTTP_STATUS.OK).json({"result": "Main get route"});
});

app.post("/auth/signup", async (request : Request, response : Response) => {
    try {
        const { email, username, password } = request.body;

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return response.status(HTTP_STATUS.BAD_REQUEST).json({ message: "User already exists" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser(email, username, hashedPassword);
        response.status(HTTP_STATUS.CREATED).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.error(error);
        response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong!"});
    }
});

app.post("/auth/login", async (request : Request, response : Response) => {
    try {
        const { email, password } = request.body;
        
        const user = await prisma.user.findUnique({where : { email } });
        if (!user) {
            return response.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid email or password" });
        }

        const isPasswordSame = await bcrypt.compare(password, user.password);
        if (!isPasswordSame) {
            return response.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid email or password" });
        }
        
        const userForSigning = { id: user.id, email: user.email };
        const accessToken = generateJwtAccessToken(userForSigning);
        const refreshToken = generateJwtRefreshToken(userForSigning);
        
        response.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: environment.NODE_ENV !== 'development',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        response.status(200).json({
            message: "Login successful",
            accessToken,
            user: { id: user.id, email: user.email, name: user.username },
        });
    }
    catch (error) {
        console.error(error);
        response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong!"});
    }
});

app.post('/auth/refresh', (request: Request, response: Response) => {
    const refreshToken = request.cookies.refreshToken;

    if (!refreshToken) {
        response.status(HTTP_STATUS.UNAUTHORIZED).json({message: "No refresh token"});
    }

    try {
        const decoded = verifyJWT(refreshToken, environment.JWT_REFRESH_SECRET);
        if (decoded) {
            const newAccessToken = generateJwtAccessToken({ id: decoded.id, email: decoded.email });
            console.log(newAccessToken)
            response.status(HTTP_STATUS.OK).json({ accessToken: newAccessToken });
        }
        response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Something went wrong!"});
    } catch (error) {
        console.error(error);
        return response.status(HTTP_STATUS.FORBIDDEN).json({ message: "Invalid refresh token" });
    }
});

app.post("/url/create", authenticateJwt ,async (request : Request, response : Response) => {
    try {
        const result = await createShortenedUrlMethod(request);
        const {message, ...filteredResult} = result;
        response.status(HTTP_STATUS.OK).json({ message: message, data: filteredResult });    
    } catch (error) {
        console.log(error);
        response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error', error: error });

    }
    
})

app.get("/url/*", async (request : Request, response : Response) => {

    const originalUrl = request.url;
    const key = originalUrl.substring(5);
    try {
        const longUrl = await getLongUrl(key);
        if (longUrl) {
            return response.redirect(longUrl);
        }
        return response.status(HTTP_STATUS.NOT_FOUND).json({"result": "Not found"});
    } catch (error) {
        console.log(error);
        response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error', error: error });
    }

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});