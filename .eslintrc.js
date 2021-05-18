module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["plugin:react/recommended", "airbnb", "prettier"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["react", "import"],
    rules: {
        "prettier/prettier": [
            "error",
            {
                "quoteProps": "consistent",
                "singleQuote": true,
                "tabWidth": 4,
                "trailingComma": "es5",
                "useTabs": false
            }
        ]
    },
    indent: ["error", "tab"],
    eslintIgnore: [
        "node_modules/",
    ],
};
