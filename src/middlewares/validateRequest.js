const VALID_KEYS = ['fibonacci', 'prime', 'lcm', 'hcf', 'AI'];

function validateRequest(req, res, next) {
    if (!req.is('application/json')) {
        return res.status(400).json({
            is_success: false,
            error: 'Content-Type must be application/json'
        });
    }

    const body = req.body;

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
        return res.status(400).json({
            is_success: false,
            error: 'Request body must be a JSON object'
        });
    }

    const presentKeys = Object.keys(body).filter(k => VALID_KEYS.includes(k));

    if (presentKeys.length === 0) {
        return res.status(400).json({
            is_success: false,
            error: `Request body must contain exactly one of: ${VALID_KEYS.join(', ')}`
        });
    }

    if (presentKeys.length > 1) {
        return res.status(400).json({
            is_success: false,
            error: 'Request body must contain exactly one key'
        });
    }

    const allKeys = Object.keys(body);
    if (allKeys.length > 1) {
        return res.status(400).json({
            is_success: false,
            error: 'Request body must contain exactly one key'
        });
    }

    const key = presentKeys[0];
    const value = body[key];

    switch (key) {
        case 'fibonacci':
            if (typeof value !== 'number' || !Number.isInteger(value)) {
                return res.status(400).json({
                    is_success: false,
                    error: 'fibonacci value must be an integer'
                });
            }
            if (value < 0) {
                return res.status(400).json({
                    is_success: false,
                    error: 'fibonacci value must be a non-negative integer'
                });
            }
            break;

        case 'prime':
        case 'lcm':
        case 'hcf':
            if (!Array.isArray(value)) {
                return res.status(400).json({
                    is_success: false,
                    error: `${key} value must be an array`
                });
            }
            if (value.length === 0) {
                return res.status(400).json({
                    is_success: false,
                    error: `${key} array must not be empty`
                });
            }
            if ((key === 'lcm' || key === 'hcf') && value.length < 2) {
                return res.status(400).json({
                    is_success: false,
                    error: `${key} requires at least 2 numbers`
                });
            }
            for (const item of value) {
                if (typeof item !== 'number' || !Number.isInteger(item)) {
                    return res.status(400).json({
                        is_success: false,
                        error: `All elements in ${key} array must be integers`
                    });
                }
            }
            if (key === 'lcm' || key === 'hcf') {
                for (const item of value) {
                    if (item <= 0) {
                        return res.status(400).json({
                            is_success: false,
                            error: `All elements in ${key} array must be positive integers`
                        });
                    }
                }
            }
            break;

        case 'AI':
            if (typeof value !== 'string') {
                return res.status(400).json({
                    is_success: false,
                    error: 'AI value must be a string'
                });
            }
            if (value.trim().length === 0) {
                return res.status(400).json({
                    is_success: false,
                    error: 'AI question must not be empty'
                });
            }
            break;
    }

    req.bfhlKey = key;
    req.bfhlValue = value;

    next();
}

module.exports = validateRequest;
