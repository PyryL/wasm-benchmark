# WebAssembly benchmark

_Benchmark Rust WebAssembly vs. JavaScript_

## Installation

After cloning this repository run the following commands:

```
npm install
npx playwright install
npm run build
```

You can run the development server with

```
npm run dev
```

or after running `npm run build` you can serve the production build with

```
npm start
```

Run `npm run build` after making changes to `rust-lib` to bring the changes to the server.
Also run `npm run build` after any changes to update the production build.

Tests can be run as follows:

```
npm run test
npm run test:e2e
npm run lint
```

Finally, you can remove all compiled and derived files by running `npm run clean`.
