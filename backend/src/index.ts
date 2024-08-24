import express, { Request, Response, Express, json } from "express";
import { createShortenedUrlMethod, getLongUrl } from "./controllers/shortenedUrl.controllers";

const app : Express = express();
const port : Number = 8080;

app.use(express.json());

app.get("/", (req : Request, res : Response) => {
    res.json({"result": "Main get route"});
    res.statusCode = 200;
});

app.post("/url/create", async (req : Request, res : Response) => {
    
    const longUrl = req.body.longUrl;
    const result = await createShortenedUrlMethod(longUrl);
    res.json({"result": result});
})

app.get("/url/*", async (req : Request, res : Response) => {

    const originalUrl = req.url;
    const key = originalUrl.substring(5);
    try {
        const longUrl = await getLongUrl(key);
        if (longUrl) {
            return res.redirect(longUrl);
        }
        return res.json({"result": "Not found"});
    } catch (error) {
        console.log(error);
    }

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});