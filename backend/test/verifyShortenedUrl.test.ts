import { isValidUrlRequestBody } from "../src/schemas";
import { INVALID_REQUEST_BODY } from "../test/urlTestUtils";

describe('verify url request body parameters', () => {
    test('should return false when url body is invalid ', () => {
        INVALID_REQUEST_BODY.forEach(
            ([longUrl]) => {
                const isValid = isValidUrlRequestBody({'longUrl': longUrl});
                expect(isValid).toBeFalsy();
            }
        )
    });

    test('should return true when url body is valid ', () => {
        const longUrl = 'https://www.amazon.com/Rust-Programming-Language-2nd/dp/1718503105/ref=sr_1_1?crid=3977W67XGQPJR&keywords=the+rust+programming+language&qid=1685542718&sprefix=the+%2Caps%2C3079&sr=8-1'
        const isValid = isValidUrlRequestBody({'longUrl': longUrl});
        expect(isValid).toBeTruthy();
    });
});