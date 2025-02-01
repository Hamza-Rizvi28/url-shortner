import { getLongUrlByKey, saveShortenedUrl, urlExists } from "../models/shortenedUrl.models";
import { isValidUrlRequestBody } from "../schemas";
import { calculateHashedUrl } from "../utils";
import { Request } from 'express';
import { CustomError } from "../error";
import { HTTP_STATUS } from "../constants";


export const createShortenedUrlMethod = async (request : Pick<Request, 'body'>) => {

    if (!(isValidUrlRequestBody(request.body))) {
        throw new CustomError(HTTP_STATUS.BAD_REQUEST, 'URL request body is not valid');
    }

    const longUrl = request.body.longUrl;
    const hashedUrlKey = calculateHashedUrl(longUrl);

    const checkUrlExists = await urlExists(longUrl);
    if (checkUrlExists) {
        console.log(`Exists: ${JSON.stringify(checkUrlExists)}`);
        return {...checkUrlExists, message: "Given url already exists!"};
    }
    try {
        const result = await saveShortenedUrl(longUrl, hashedUrlKey);
        console.log(result);
        return {...result, message: "URL shortened successfully!"}   
    } catch (error) {
        console.log(error);
        return {message: 'Error:' + error}
    }
};

export const getLongUrl = async (key : string) => {
    const result = await getLongUrlByKey(key);
    return result?.longUrl;
};

