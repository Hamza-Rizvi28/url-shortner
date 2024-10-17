import { z } from 'zod';
import { UrlRequestSchema } from '../schemas';

export type UrlRequestBody = z.infer<typeof UrlRequestSchema>;

export type RequestBodyTypes = UrlRequestBody;