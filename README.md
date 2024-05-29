# WebAssembly benchmark

_Benchmark Rust WebAssembly vs. JavaScript_

## Installation

### Container

This project supports Docker. Simply run

```
docker build -t wasm-benchmark .
```

to build the image and start it with

```
docker container run -p 80:80 wasm-benchmark
```

The server appears at [localhost:80](http://localhost:80).
The port can be changed by replacing the first `80` with the new port number.

### Manual installation

To work with this project, you need to have [Rust & Cargo](https://www.rust-lang.org/tools/install)
and [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/) installed.

After cloning this repository run the following commands:

```
npm install
npx playwright install
npm run build
```

You can run the development server with

```
npm run dev         # frontend
npm run start:dev   # backend
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
cargo test --manifest-path rust-lib/Cargo.toml
```

Finally, you can remove all compiled and derived files by running `npm run clean`.


## Development

NPM dependencies are should be saved into correct category.
Production dependencies are used by the backend.
Development dependencies are only used by the frontend (not needed after building) and tests
or they are development tools.


## Licenses

JavaScript logo under MIT license from [voodootikigod/logo.js](https://github.com/voodootikigod/logo.js).

Rust logo under CC-BY license from [rust-lang/rust-artwork](https://github.com/rust-lang/rust-artwork/).
