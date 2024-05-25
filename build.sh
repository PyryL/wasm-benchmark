#!/bin/bash

# To build the whole project, run
# ./build.sh
# To build only the Rust part, run
# ./build.sh rust
# To build only the React part, run
# ./build.sh react
# Note that in order to function correctly,
# Rust build must have been run before React build

set -e

build_rust() {
    # Build Rust package
    wasm-pack build rust-lib --target web

    # Make the Rust package available
    mkdir -p public/modules
    cp rust-lib/pkg/rust_lib.js public/modules/rust_lib.js
    cp rust-lib/pkg/rust_lib_bg.wasm public/modules/rust_lib_bg.wasm
}

build_react() {
    # Build React app
    vite build
}


if [ "$1" == "rust" ]; then
    build_rust
elif [ "$1" == "react" ]; then
    build_react
else
    build_rust
    build_react
fi
