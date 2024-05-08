
# Build Rust package
wasm-pack build rust-lib --target no-modules

# Make the Rust package available
mkdir public/modules
cp rust-lib/pkg/rust_lib.js public/modules/rust_lib.js
cp rust-lib/pkg/rust_lib_bg.wasm public/modules/rust_lib_bg.wasm

# Build React app
vite build
