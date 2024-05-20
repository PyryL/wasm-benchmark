
use rand::{self, Rng};
use wasm_bindgen::prelude::*;

/// Returns the `n`th prime number.
#[wasm_bindgen]
pub fn nth_prime(n: u32) -> u32 {
    let mut num = 1;
    let mut prime_count = 0;

    while prime_count < n {
        if is_prime(num, 512) {
            prime_count += 1;
        }
        num += 1;
    }

    num - 1
}

/// ## Parameters
/// - `num`: The number to test.
/// - `k`: Determines the accuracy of the test. Higher value means more accurate.
/// 
/// ## Return value
/// Whether `num` is (likely) a prime number.
fn is_prime(num: u32, k: u32) -> bool {
    if num <= 1 || num == 4 {
        return false
    }
    if num == 2 || num == 3 {
        return true
    }
    if num % 2 == 0 {
        return false
    }

    let mut d = num - 1;
    while d % 2 == 0 {
        d /= 2;
    }

    for _ in 0..k {
        if !miller_test(d, num) {
            return false
        }
    }

    true
}

/// ## Parameters
/// - `d`: The product of the factors of `n` without the factor 2.
/// - `n`: The number to test.
/// 
/// ## Return value
/// Whether `n` seems to be a prime.
fn miller_test(mut d: u32, n: u32) -> bool {
    let a = rand::thread_rng().gen_range(2..=n-2);

    // Since x is temporarily squared in the while loop,
    // it needs to be stored as u64.
    let mut x: u64 = mod_exp(a, d, n) as u64;

    if x == 1 || x == (n-1).into() {
        return true
    }

    while d != n-1 {
        x = (x * x) % n as u64;
        d *= 2;
        if x == 1 {
            return false
        }
        if x == (n-1).into() {
            return true
        }
    }

    false
}

/// Calculate `base` raised to the power of `exp` in modulo `modulo`.
fn mod_exp(base: u32, mut exp: u32, modulo: u32) -> u32 {
    // Since base is temporarily squared in the while loop,
    // it needs to be u64 in here.
    // Largest allowed argument value is u32, though.
    let mut base: u64 = base as u64;

    let mut result = 1u32;

    base %= modulo as u64;

    while exp > 0 {
        if exp % 2 == 1 {
            result = ((result as u64 * base) % modulo as u64) as u32;
        }
        exp /= 2;
        base = (base * base) % modulo as u64;
    }

    result
}

#[cfg(test)]
mod test {
    use super::{is_prime, nth_prime};

    #[test]
    fn small_number_is_prime() {
        assert!(is_prime(7919, 128));
    }

    #[test]
    fn large_number_is_prime() {
        assert!(is_prime(39916801, 128));
    }

    #[test]
    fn huge_even_number_is_not_prime() {
        assert!(!is_prime(2387247226, 128));
    }

    #[test]
    fn corner_cases_with_small_numbers() {
        assert!(!is_prime(1, 128));
        assert!(is_prime(2, 128));
        assert!(is_prime(3, 128));
        assert!(!is_prime(4, 128));
        assert!(is_prime(5, 128));
    }

    #[test]
    fn finding_nth_prime_works() {
        assert_eq!(nth_prime(10), 29);
    }
}
