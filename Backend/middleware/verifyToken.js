// Cookie parser
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.cookies.access_token;
    if (!token) return res.status(403).send("Not Authorized");

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.userID = data._id; // Store User DB id in request, id is transfered via cookie
        return next();
    } catch {
        // On every error return 403
        return res.status(403).send("Not Authorized");
    }
};