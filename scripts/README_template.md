# ts-package-template

Typescript template for creating and publishing with rollup, typescript, jest, eslint, prettier, and husky

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

Just run `npm publish`, which should build the package with rollup, increment the version, and publish the results.
