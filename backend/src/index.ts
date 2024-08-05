import express, { Request, Response, Express } from "express";

const app : Express = express();
const port : Number = 3000;

app.get("/", (req : Request, res : Response) => {
    res.json({"result": "Main get route"});
    res.statusCode = 200;
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});