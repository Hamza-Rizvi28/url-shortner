import { createShortenedUrlMethod, getLongUrl } from "../src/controllers/shortenedUrl.controllers";
import { getLongUrlByKey, saveShortenedUrl, urlExists } from "../src/models/shortenedUrl.models";
import { calculateHashedUrl } from "../src/utils";

jest.mock('../src/utils', () => ({
    calculateHashedUrl: jest.fn(),
}));

jest.mock('../src/models/shortenedUrl.models', () => ({
    urlExists: jest.fn(),
    saveShortenedUrl: jest.fn(),
    getLongUrlByKey: jest.fn(),
}));

describe('url shortener service', () => {
    
    const longUrl = 'https://www.amazon.com/Rust-Programming-Language-2nd/dp/1718503105/ref=sr_1_1?crid=3977W67XGQPJR&keywords=the+rust+programming+language&qid=1685542718&sprefix=the+%2Caps%2C3079&sr=8-1'
    const mockedResponse = {
        "data": {
            "longUrl": "https://www.amazon.com/Rust-Programming-Language-2nd/dp/1718503105/ref=sr_1_1?crid=3977W67XGQPJR&keywords=the+rust+programming+language&qid=1685542718&sprefix=the+%2Caps%2C3079&sr=8-1",
            "shortUrl": "http://localhost:8080/url/0d0309d9aafa126d1bd7513c0ef545d0",
            "key": "0d0309d9aafa126d1bd7513c0ef545d0",
            "createdAt": "2025-01-09T18:46:03.313Z"
        }
    };

    const hashedUrlKey = '0d0309d9aafa126d1bd7513c0ef545d0';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return existing shortened URL if the URL already exists', async () => {    
      
        (urlExists as jest.Mock).mockResolvedValue(mockedResponse);
        (calculateHashedUrl as jest.Mock).mockReturnValue(hashedUrlKey);

        const result = await createShortenedUrlMethod(longUrl);

        expect(calculateHashedUrl).toHaveBeenCalledWith(longUrl);
        expect(urlExists).toHaveBeenCalledWith(longUrl);
        expect(saveShortenedUrl).not.toHaveBeenCalled();
        expect(result).toStrictEqual({ ...mockedResponse, message: 'Given url already exists!' });
    });

    test('should save a new shortened URL if it does not exist', async () => {
        (urlExists as jest.Mock).mockResolvedValue(null);
        (calculateHashedUrl as jest.Mock).mockReturnValue(hashedUrlKey);
        
        (saveShortenedUrl as jest.Mock).mockResolvedValue(mockedResponse);

        const result = await createShortenedUrlMethod(longUrl);

        expect(calculateHashedUrl).toHaveBeenCalledWith(longUrl);
        expect(urlExists).toHaveBeenCalledWith(longUrl);
        expect(saveShortenedUrl).toHaveBeenCalledWith(longUrl, hashedUrlKey);
        expect(result).toStrictEqual({ ...mockedResponse, message: 'URL shortened successfully!' });

    });

    test('should return an error message if saveShortenedUrl throws an error', async () => {
        (urlExists as jest.Mock).mockResolvedValue(null);
        (calculateHashedUrl as jest.Mock).mockReturnValue(hashedUrlKey);
        (saveShortenedUrl as jest.Mock).mockRejectedValue(new Error('Database error'));

        const result = await createShortenedUrlMethod(longUrl);

        expect(urlExists).toHaveBeenCalledWith(longUrl);
        expect(saveShortenedUrl).toHaveBeenCalledWith(longUrl, hashedUrlKey);
        expect(result).toEqual({ message: 'Error:Error: Database error' });
    });

    test('should return the long url response when short url is correct', async () => {
        
        (getLongUrlByKey as jest.Mock).mockResolvedValue({longUrl});
        
        const result = await getLongUrl(hashedUrlKey);
        expect(getLongUrlByKey).toHaveBeenCalledWith(hashedUrlKey);
        expect(result).toBe(longUrl);
    });

    test('should not return the long url response when short url does not exists', async () => {
        
        (getLongUrlByKey as jest.Mock).mockResolvedValue(null);
    
        const result = await getLongUrl(hashedUrlKey);

        expect(getLongUrlByKey).toHaveBeenCalledWith(hashedUrlKey);
        expect(result).toBeUndefined();
    });

    test('should throw an error if getLongUrlByKey throws an error', async () => {
        (getLongUrlByKey as jest.Mock).mockRejectedValue(new Error('Database error'));

        await expect(getLongUrl(hashedUrlKey)).rejects.toThrow('Database error');
        expect(getLongUrlByKey).toHaveBeenCalledWith(hashedUrlKey);
        
    });
});