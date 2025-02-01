import express, { Request, Response, Express, json } from "express";
import { createShortenedUrlMethod, getLongUrl } from "./controllers/shortenedUrl.controllers";
import { environment } from "./config";
import { CORS_ORIGIN, HTTP_STATUS } from "./constants";

const app : Express = express();
const port : number = environment.PORT;
const cors = require('cors');

app.use(express.json());
app.use(cors({
    origin: CORS_ORIGIN
}));

app.get("/", (request : Request, response : Response) => {
    response.status(HTTP_STATUS.OK).json({"result": "Main get route"});
});

app.post("/url/create", async (request : Request, response : Response) => {
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