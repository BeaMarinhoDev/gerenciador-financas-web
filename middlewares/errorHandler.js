export function errorHandler(err, req, res, next) {
    console.error(`[ERROR] ${err.message}`);
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        error: true,
        message: err.message || 'Erro interno do servidor',
    });
}