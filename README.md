# ts-package-template

Typescript template for creating and publishing with rollup, typescript, jest, eslint, prettier, and husky

## Usage

Replace all instances of `ts-package-template` with the name of your actual npm package.

## React

Run the following:

```sh
npm i -D eslint-plugin-react-hooks eslint-plugin-react @types/react @testing-library/react-hooks @testing-library/react
```

Replace the following sections in `.eslintrc.json`:

```json
{
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "plugins": ["react", "@typescript-eslint"]
}
```

And then to `tsconfig.json`, add the following line:

```json
{
  "jsx": "react-jsx"
}
```

## Publishing

Just run `npm publish`, which should build the package with rollup, increment the version, and publish the results.
