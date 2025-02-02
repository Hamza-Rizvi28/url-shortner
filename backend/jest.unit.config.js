module.exports = {
    preset: 'ts-jest',
    testMatch: [
        '**.test.ts',
    ],
    testPathIgnorePatterns: [
        '.integration.test.ts',
    ],
};