
use wasm_bindgen::prelude::*;

/// Recursively calculate the nth item of the Fibonacci sequence.
/// With `n=0` this returns 0.
/// `n` may not be greather than 47.
#[wasm_bindgen]
pub fn fibonacci(n: u8) -> u32 {
    if n > 47 {
        panic!("too large input for fibonacci");
    }
    if n <= 1 {
        return n as u32
    }
    fibonacci(n-1) + fibonacci(n-2)
}

#[wasm_bindgen]
pub struct Matrix {
    data: Vec<Vec<u64>>
}

#[wasm_bindgen]
impl Matrix {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Matrix {
        Matrix { data: vec![] }
    }

    pub fn add_row(&mut self, row: Vec<u64>) {
        self.data.push(row);
    }

    pub fn get_row(&self, index: usize) -> Vec<u64> {
        self.data[index].clone()
    }

    pub fn multiply(&self, other: &Matrix, size: usize) -> Matrix {
        let mut result = Matrix::new();

        for i in 0..size {
            let mut result_row = vec![];
            for j in 0..size {
                let mut value = 0u64;
                for k in 0..size {
                    value += self.data[i][k] * other.data[k][j];
                }
                result_row.push(value);
            }
            result.add_row(result_row);
        }

        result
    }
}

#[cfg(test)]
mod test {
    use crate::fibonacci;

    #[test]
    fn fibonacci_values() {
        assert_eq!(fibonacci(0), 0);
        assert_eq!(fibonacci(1), 1);
        assert_eq!(fibonacci(2), 1);
        assert_eq!(fibonacci(3), 2);
        assert_eq!(fibonacci(11), 89);
        assert_eq!(fibonacci(29), 514229);
        assert_eq!(fibonacci(40), 102334155);
    }

    #[test]
    #[should_panic]
    fn fibonacci_panics_with_too_large_input() {
        fibonacci(48);
    }
}
