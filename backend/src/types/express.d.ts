import { UserPayload } from "./requestBodyTypes";

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}