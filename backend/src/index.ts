import express, { Request, Response, Express, json } from "express";
import { createShortenedUrlMethod, getLongUrl } from "./controllers/shortenedUrl.controllers";
import { UrlRequestSchema } from "./schemas";
import { validateRequestBody } from "./middlewares/validationMiddleware";
import { environment } from "./config";
import { HTTP_STATUS } from "./constants";

const app : Express = express();
const port : number = environment.PORT;

app.use(express.json());

app.get("/", (req : Request, res : Response) => {
    res.status(HTTP_STATUS.OK).json({"result": "Main get route"});
});

app.post("/url/create", validateRequestBody(UrlRequestSchema),  async (req : Request, res : Response) => {
    try {
        const longUrl = req.body.longUrl;
        const result = await createShortenedUrlMethod(longUrl);
        const {message, ...filteredResult} = result;
        res.status(HTTP_STATUS.OK).json({ message: message, data: filteredResult });    
    } catch (error) {
        console.log(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error', error: error });

    }
    
})

app.get("/url/*", async (req : Request, res : Response) => {

    const originalUrl = req.url;
    const key = originalUrl.substring(5);
    try {
        const longUrl = await getLongUrl(key);
        if (longUrl) {
            return res.redirect(longUrl);
        }
        return res.status(HTTP_STATUS.NOT_FOUND).json({"result": "Not found"});
    } catch (error) {
        console.log(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error', error: error });
    }

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});