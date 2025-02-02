module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: true,
    },
    plugins: ['@typescript-eslint', '@stylistic/eslint-plugin', "deprecation"],
    ignorePatterns: [
        '.eslintrc.cjs',
    ],
    root: true,
    rules: {
        '@stylistic/semi': ['error', 'always'],
        '@stylistic/no-tabs': ['error', { allowIndentationTabs: false }],
        '@stylistic/no-trailing-spaces': ['error',  { skipBlankLines: false, ignoreComments: false }],
        '@stylistic/no-whitespace-before-property': ['error'],
        '@stylistic/array-bracket-spacing': ['error', 'never'],
        '@stylistic/object-curly-spacing': ['error', 'always'],
        '@stylistic/function-call-spacing': ['error', 'never'],
        '@stylistic/space-in-parens': ['error', 'never'],
        '@stylistic/comma-dangle': ['error', 'always-multiline'],
        '@typescript-eslint/no-explicit-any': 'error',
        quotes: ['error', 'single'],
        "no-unused-vars": "off",
        '@typescript-eslint/no-unused-vars': ['warn', {'varsIgnorePattern': 'handler'}],
        "deprecation/deprecation": "warn",
        '@typescript-eslint/no-unused-expressions': 'off',
    }
};