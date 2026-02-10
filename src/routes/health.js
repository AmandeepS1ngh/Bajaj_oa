const express = require('express');
const router = express.Router();

const OFFICIAL_EMAIL = process.env.OFFICIAL_EMAIL || 'your_email@chitkara.edu.in';

router.get('/', (req, res) => {
    return res.status(200).json({
        is_success: true,
        official_email: OFFICIAL_EMAIL
    });
});

module.exports = router;
