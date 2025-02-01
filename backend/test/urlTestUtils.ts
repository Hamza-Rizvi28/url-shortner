export const INVALID_REQUEST_BODY : [longUrl : unknown][] = [
    ['http:hello.com'],
    ['http:facebook'],
    ['aldlasd'],
    [12241],
    [{longUrl: 'http://hello.com'}],
    ['']

] as const;
