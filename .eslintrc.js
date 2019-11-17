module.exports = {
    extends: ['voidpumpkin/react', 'plugin:react/recommended'],
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
