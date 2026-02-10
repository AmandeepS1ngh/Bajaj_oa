require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const bfhlRoutes = require('./routes/bfhl');
const healthRoutes = require('./routes/health');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        is_success: false,
        error: 'Too many requests, please try again later'
    }
});
app.use(limiter);

app.use((req, res, next) => {
    express.json({ limit: '1mb' })(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                is_success: false,
                error: 'Invalid JSON in request body'
            });
        }
        next();
    });
});

app.use('/bfhl', bfhlRoutes);
app.use('/health', healthRoutes);

app.use((req, res) => {
    res.status(404).json({
        is_success: false,
        error: `Route ${req.method} ${req.originalUrl} not found`
    });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`BFHL API server running on port ${PORT}`);
});

module.exports = app;
