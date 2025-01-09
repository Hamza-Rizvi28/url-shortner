import { environment } from "./config";

export const PROD_BASE_URL : string = environment.PROD_BASE_URL;
export const DEV_BASE_URL : string = "http://localhost:8080";
export const CORS_ORIGIN : string = "http://localhost:5173"

export const HTTP_STATUS = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  };
