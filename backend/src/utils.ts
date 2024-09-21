import { createHash } from "crypto";

export const calculateHashedUrl = (longUrl : string) => {
    return createHash('md5').update(longUrl).digest('hex').toString();
};