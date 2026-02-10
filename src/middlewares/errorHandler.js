function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        is_success: false,
        error: err.message || 'Internal server error'
    });
}

module.exports = errorHandler;
