import { z } from 'zod';

const urlRegex = new RegExp(
    '^(https?:\\/\\/)?' +
  '(([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,})|' + // Domain name
  '((\\d{1,3}\\.){3}\\d{1,3})' +         // OR IP address
  '(\\:\\d+)?(\\/[-a-zA-Z0-9%_.~+]*)*' + // Optional port and path
  '(\\?[;&a-zA-Z0-9%_.~+=-]*)?' +         // Optional query string
  '(\\#[-a-zA-Z0-9_]*)?$'                // Optional fragment
);

export const UrlRequestSchema = z.object({
    longUrl: z.string().regex(urlRegex, { message: 'Invalid URL format' })
});
