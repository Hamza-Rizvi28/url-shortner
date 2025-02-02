import { UrlRequestBody } from "./types/requestBodyTypes";

const urlRegex = new RegExp(
  '^(https?:\\/\\/)?' +
  '(([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,})|' + // Domain name
  '((\\d{1,3}\\.){3}\\d{1,3})' +         // OR IP address
  '(\\:\\d+)?(\\/[-a-zA-Z0-9%_.~+]*)*' + // Optional port and path
  '(\\?[;&a-zA-Z0-9%_.~+=-]*)?' +         // Optional query string
  '(\\#[-a-zA-Z0-9_]*)?$'                // Optional fragment
);

export const isValidUrlRequestBody = (urlBody: unknown): urlBody is UrlRequestBody => {

  if (typeof urlBody !== 'object' || urlBody === null) {
    return false;
  }

  const body = urlBody as Record<string, unknown>;

  return ('longUrl' in body && 
          typeof body.longUrl === 'string' && 
          urlRegex.test(body.longUrl));
};