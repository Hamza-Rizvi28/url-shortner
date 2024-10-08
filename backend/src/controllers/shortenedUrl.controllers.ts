import { getLongUrlByKey, saveShortenedUrl, urlExists } from "../models/shortenedUrl.models";
import { calculateHashedUrl } from "../utils";


export const createShortenedUrlMethod = async (longUrl : string) => {

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

