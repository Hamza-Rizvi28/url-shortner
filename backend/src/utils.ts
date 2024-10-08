import { createHash } from "crypto";
import { DEV_BASE_URL, PROD_BASE_URL } from "./constants";
import { environment } from "./config";

export const calculateHashedUrl = (longUrl : string) => {
    return createHash('md5').update(longUrl).digest('hex').toString();
};

export const baseUrl = environment.NODE_ENV === "development" ? DEV_BASE_URL : PROD_BASE_URL;