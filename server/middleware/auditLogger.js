const AuditLog = require('../models/AuditLog');

const auditLogger = async (req, res, next) => {
    // Only log write operations (POST, PUT, DELETE) from authenticated admins
    const methods = ['POST', 'PUT', 'DELETE'];
    if (!methods.includes(req.method) || !req.user) {
        return next();
    }

    // Capture the original send to log after response is sent
    const originalSend = res.send;
    res.send = function (body) {
        const status = res.statusCode;
        
        // Log only successful operations
        if (status >= 200 && status < 300) {
            const action = `${req.method} ${req.originalUrl}`;
            const resource = req.originalUrl.split('/')[2] || 'unknown';
            
            const logEntry = new AuditLog({
                admin: req.user.id,
                action,
                resource,
                details: {
                    body: req.body,
                    params: req.params,
                    query: req.query,
                    statusCode: status
                }
            });
            
            logEntry.save().catch(err => console.error('Audit Log Error:', err));
        }
        
        return originalSend.apply(res, arguments);
    };

    next();
};

module.exports = auditLogger;
