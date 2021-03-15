module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
    },
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
        'eslint:recommended',
        'airbnb-typescript',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
        'plugin:prettier/recommended',
    ],
    rules: {
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        '@typescript-eslint/explicit-member-accessibility': [
            'error',
            { accessibility: 'explicit', overrides: { constructors: 'no-public' } },
        ],
        'func-call-spacing': 'off',
        '@typescript-eslint/func-call-spacing': ['error'],
        '@typescript-eslint/member-ordering': ['warn'],
        '@typescript-eslint/no-extraneous-class': ['warn'],
        'no-magic-numbers': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/prefer-for-of': ['warn'],
        'import/prefer-default-export': 'off',
        'array-callback-return': 'off',
        'consistent-return': 'off',
        'no-restricted-syntax': [
            'error',
            {
                selector: 'ForInStatement',
                message:
                    'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
            },
            {
                selector: 'LabeledStatement',
                message:
                    'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
            },
            {
                selector: 'WithStatement',
                message:
                    '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
            },
        ],
        'import/order': ['error', { alphabetize: { order: 'asc', caseInsensitive: true } }],
        'no-alert': 'off',
        'global-require': 'off',
        'lines-between-class-members': 'off',
        '@typescript-eslint/camelcase': 'off',
    },
    overrides: [
        {
            files: ['*.entity.ts', '*.dto.ts', '*.input.ts'],
            rules: {
                '@typescript-eslint/explicit-member-accessibility': 'off',
            },
        },
        {
            files: ['*.module.ts'],
            rules: {
                '@typescript-eslint/no-extraneous-class': 'off',
            },
        },
    ],
    ignorePatterns: ['migration/'],
};
