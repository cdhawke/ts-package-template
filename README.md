# create-ts-package-template

Typescript template for creating and publishing with rollup, typescript, jest, eslint, prettier, and husky

## Usage

```sh
npx create-ts-package-template package-name
```

## React

To add React linting and compatibility for publishing things like components, you can specify the
`--react` flag during creation:

```sh
npx create-ts-package-template package-name --react
```

You can then `cd` into the `package-name` directory and `build`, `test` or `publish`

## Building

```sh
yarn build
```

Or, to minify and remove source maps:

```sh
yarn build-production
```

## Testing

```sh
yarn test
```

Note: If publishing for a web app, you may need the `jsdom` `testEnvironment` in the `jest.config.js`
See https://jestjs.io/docs/configuration#testenvironment-string

## Publishing

```sh
yarn publish
```

This should build the package with rollup, use the specified version, and publish the results.
