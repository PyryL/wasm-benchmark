FROM node:20-bookworm AS build-step

# BUILD

WORKDIR /app

# install Rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

# install wasm-pack tool
RUN cargo install wasm-pack

# install wasm-opt required by wasm-pack
RUN curl -L https://github.com/WebAssembly/binaryen/releases/download/version_117/binaryen-version_117-x86_64-linux.tar.gz | tar xz -C /usr/local
ENV PATH="/usr/local/binaryen-version_117/bin:${PATH}"

# install browsers for E2E tests
RUN npx playwright install --with-deps

ADD package.json .
ADD rust-lib/ rust-lib/
ADD build.sh .
ADD src/ src/
ADD public/ public/
ADD index.html .
ADD vite.config.js .

RUN npm install
RUN npm run build

ADD playwright.config.cjs .
ADD .eslintrc.cjs .
ADD test/ test/
ADD e2e-test/ e2e-test/
ADD babel.config.cjs .


# TEST

RUN npm run lint
RUN npm run test
RUN npm run test:e2e


# DEPLOY

FROM node:20-alpine

WORKDIR /app

COPY --from=build-step /app/dist/ dist/
ADD package.json .
RUN npm install -g http-server@^14.1.1

EXPOSE 80
ENV PORT=80

RUN chown node .
USER node

CMD npm start
