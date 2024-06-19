#!/bin/bash

# To build the whole project, run
# ./build.sh
# To build only the Rust part, run
# ./build.sh rust
# To build only the C part, run
# ./build.sh c
# To build only the React part, run
# ./build.sh react
# Note that in order to function correctly,
# Rust and C builds must have been run before React build

set -e

build_rust() {
    # Build Rust package
    wasm-pack build rust-lib --target web

    # Make the Rust package available
    mkdir -p public/modules
    cp rust-lib/pkg/rust_lib.js public/modules/rust_lib.js
    cp rust-lib/pkg/rust_lib_bg.wasm public/modules/rust_lib_bg.wasm
}

build_c() {
    # make sure that the output directory exists
    mkdir -p public/modules

    emcc c-lib/main.c -O2 -o public/modules/c_lib.js \
        -s EXPORTED_FUNCTIONS='["_fibonacci"]' \
        -s MODULARIZE -s EXPORT_ES6 -s ENVIRONMENT='web,worker' \
        -s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap"]'
}

build_react() {
    # Build React app
    vite build
}


if [ "$1" == "rust" ]; then
    build_rust
elif [ "$1" == "c" ]; then
    build_c
elif [ "$1" == "react" ]; then
    build_react
else
    build_rust
    build_c
    build_react
fi
