function fibonacci(n) {
    if (!Number.isInteger(n) || n < 0) {
        throw new Error('fibonacci requires a non-negative integer');
    }
    if (n === 0) return [];
    if (n === 1) return [0];

    const result = [0, 1];
    for (let i = 2; i < n; i++) {
        result.push(result[i - 1] + result[i - 2]);
    }
    return result;
}

function isPrime(num) {
    if (!Number.isInteger(num) || num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
    }
    return true;
}

function filterPrimes(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('prime requires an array of integers');
    }
    if (arr.length === 0) {
        throw new Error('prime array must not be empty');
    }
    for (const item of arr) {
        if (typeof item !== 'number' || !Number.isInteger(item)) {
            throw new Error('All elements in prime array must be integers');
        }
    }
    return arr.filter(isPrime);
}

function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}

function lcmTwo(a, b) {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / gcd(a, b);
}

function lcm(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('lcm requires an array of integers');
    }
    if (arr.length < 2) {
        throw new Error('lcm requires at least 2 numbers');
    }
    for (const item of arr) {
        if (typeof item !== 'number' || !Number.isInteger(item) || item <= 0) {
            throw new Error('All elements in lcm array must be positive integers');
        }
    }
    return arr.reduce((acc, val) => lcmTwo(acc, val));
}

function hcf(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('hcf requires an array of integers');
    }
    if (arr.length < 2) {
        throw new Error('hcf requires at least 2 numbers');
    }
    for (const item of arr) {
        if (typeof item !== 'number' || !Number.isInteger(item) || item <= 0) {
            throw new Error('All elements in hcf array must be positive integers');
        }
    }
    return arr.reduce((acc, val) => gcd(acc, val));
}

module.exports = { fibonacci, filterPrimes, lcm, hcf };
