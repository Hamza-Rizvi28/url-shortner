import express, { Request, Response, Express } from "express";
import { environment } from "./config";
import { CORS_ORIGIN, HTTP_STATUS } from "./constants";
import cookieParser from "cookie-parser";
import urlRouter from "./routes/url.routes";
import authRouter from "./routes/auth.routes";

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

app.use('/auth', authRouter);
app.use('/url', urlRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});