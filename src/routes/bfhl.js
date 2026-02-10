const express = require('express');
const router = express.Router();

const { fibonacci, filterPrimes, lcm, hcf } = require('../utils/math');
const { askGemini } = require('../services/aiService');
const validateRequest = require('../middlewares/validateRequest');

const OFFICIAL_EMAIL = process.env.OFFICIAL_EMAIL || 'your_email@chitkara.edu.in';

router.get('/', (req, res) => {
    return res.status(200).json({
        is_success: true,
        official_email: OFFICIAL_EMAIL
    });
});

router.post('/', validateRequest, async (req, res, next) => {
    try {
        const { bfhlKey, bfhlValue } = req;
        let data;

        switch (bfhlKey) {
            case 'fibonacci':
                data = fibonacci(bfhlValue);
                break;

            case 'prime':
                data = filterPrimes(bfhlValue);
                break;

            case 'lcm':
                data = lcm(bfhlValue);
                break;

            case 'hcf':
                data = hcf(bfhlValue);
                break;

            case 'AI':
                data = await askGemini(bfhlValue);
                break;

            default:
                return res.status(400).json({
                    is_success: false,
                    error: 'Unsupported operation'
                });
        }

        return res.status(200).json({
            is_success: true,
            official_email: OFFICIAL_EMAIL,
            data
        });
    } catch (error) {
        if (error.message && !error.message.includes('API')) {
            return res.status(400).json({
                is_success: false,
                error: error.message
            });
        }
        next(error);
    }
});

module.exports = router;
