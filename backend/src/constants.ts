import { environment } from "./config";

export const PROD_BASE_URL : string = environment.PROD_BASE_URL;
export const DEV_BASE_URL : string = "localhost";

export const HTTP_STATUS = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  };
