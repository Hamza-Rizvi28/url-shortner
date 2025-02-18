import { Request, Response, Router } from 'express';
import { authenticateJwt } from '../authenticationMiddleware';
import { HTTP_STATUS } from '../constants';
import { createShortenedUrlMethod, getLongUrl } from '../controllers/shortenedUrl.controllers';

const router = Router();

router.post('/url/create', authenticateJwt, async (request: Request, response: Response) => {
    try {
        const result = await createShortenedUrlMethod(request);
        const { message, ...filteredResult } = result;
        response.status(HTTP_STATUS.OK).json({ message: message, data: filteredResult });
    } catch (error) {
        console.log(error);
        response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error', error: error });

    }

});

router.get('/url/*', async (request: Request, response: Response) => {

    const originalUrl = request.url;
    const key = originalUrl.substring(5);
    try {
        const longUrl = await getLongUrl(key);
        if (longUrl) {
            return response.redirect(longUrl);
        }
        return response.status(HTTP_STATUS.NOT_FOUND).json({ 'result': 'Not found' });
    } catch (error) {
        console.log(error);
        response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error', error: error });
    }

});

export default router;