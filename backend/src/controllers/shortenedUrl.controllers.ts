import { saveShortenedUrl, urlExists } from "../models/shortenedUrl.models";


export const createShortenedUrlMethod = async (longUrl : string) => {

    const hashedUrlKey = "xhrze"

    const checkUrlExists = await urlExists(longUrl);
    if (checkUrlExists) {
        console.log(`Exists: ${JSON.stringify(checkUrlExists)}`);
        return checkUrlExists;
    }
    try {
        const result = await saveShortenedUrl(longUrl, hashedUrlKey);
        console.log(result);
        return result;    
    } catch (error) {
        console.log(error);
        return;
    }
};

