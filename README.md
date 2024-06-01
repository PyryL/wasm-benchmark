# WebAssembly benchmark

_Benchmark Rust WebAssembly vs. JavaScript_

## Installation

### Docker

Build the image with

```bash
docker build -t wasm-benchmark .
```

For local development and testing, the container can easily been started by running

```bash
POSTGRES_PASSWORD=yourpassword docker compose up --build
```

Replace `yourpassword` with a random password for the database.
This compose contains its own database, so you don't have to set it up yourself.
The server appears at [localhost:80](http://localhost:80).

Alternatively, to start the container in production,
you have to pass `DATABASE_URL` environment variable holding `postgres://...` URL for the database.
As an example, the start command could look something like this:

```
docker container run -p 80:80 -e DATABASE_URL=postgres://user:pass@example.com:5432/mydb wasm-benchmark
```

### Manual installation

To work with this project, you need to have [Rust & Cargo](https://www.rust-lang.org/tools/install)
and [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/) installed.

After cloning this repository run the following commands:

```bash
npm install
npx playwright install
npm run build
```

Create a file called `.env` and add your Postgres URL with key `DATABASE_URL`.

Then you can run the development server with

```bash
npm run dev         # frontend
npm run start:dev   # backend
```

or after running `npm run build` you can serve the production build with

```bash
npm start
```

Run `npm run build` after making changes to `rust-lib/` to bring the changes to the server.
Also run `npm run build` after any changes to update the production build.

Tests can be run as follows:

```bash
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
