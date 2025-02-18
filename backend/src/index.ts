import express, { Request, Response, Express } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import urlRouter from './routes/url.route';
import authRouter from './routes/auth.route';
import { environment } from './config';
import { CORS_ORIGIN, HTTP_STATUS } from './constants';

const app : Express = express();
const port : number = environment.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: CORS_ORIGIN,
}));

app.get('/', (request : Request, response : Response) => {
    response.status(HTTP_STATUS.OK).json({ 'result': 'Main get route' });
});

app.use('/auth', authRouter);
app.use('/url', urlRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});