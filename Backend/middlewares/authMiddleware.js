const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ error: "Invalid token format. Use 'Bearer <token>'." });
    }

    const token = parts[1];

    try {
        let decoded;
        let secret;
        let role;

        if (token.startsWith("company_")) {
            secret = process.env.COMPANY_SECRET_KEY;
            role = 'company';
        } else if (token.startsWith("admin_")) {
            secret = process.env.ADMIN_SECRET_KEY;
            role = 'admin';
        } else {
            return res.status(400).json({ error: "Invalid token type." });
        }

        decoded = jwt.verify(token.replace(`${role}_`, ""), secret);
        req.user = decoded;
        req.role = role;
        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid token." });
    }
}

module.exports = authMiddleware;