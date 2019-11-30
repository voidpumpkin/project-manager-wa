module.exports = {
    extends: ['voidpumpkin/react', 'plugin:react/recommended'],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 9,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        browser: true
    },
    rules: {
        strict: 0,
        'react/prop-types': 0
    },
    overrides: [
        {
            files: ['*.js'],
            extends: ['voidpumpkin', 'plugin:react/recommended'],
            env: {
                node: true
            }
        }
    ]
};
