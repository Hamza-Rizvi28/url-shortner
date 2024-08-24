import express, { Request, Response, Express, json } from "express";
import { createShortenedUrlMethod } from "./controllers/shortenedUrl.controllers";

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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});