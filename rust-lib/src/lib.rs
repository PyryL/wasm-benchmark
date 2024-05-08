
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn fibonacci(n: u8) -> u64 {
    if n <= 1 {
        return n as u64
    }
    fibonacci(n-1) + fibonacci(n-2)
}
