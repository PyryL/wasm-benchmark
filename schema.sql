
-- Written for Postgres 16

CREATE TABLE Benchmarks (
    id SERIAL PRIMARY KEY,
    benchmark_name TEXT NOT NULL,
    js_result INT,
    rust_result INT,
    browser_info TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
