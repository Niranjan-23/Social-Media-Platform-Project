// middlewares/verifyToken.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    // Expect header format: "Bearer <token>"
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Token is not valid" });
      req.user = user; // The payload contains the user id
      next();
    });
  } else {
    return res.status(401).json({ message: "You are not authenticated" });
  }
};

module.exports = verifyToken;
