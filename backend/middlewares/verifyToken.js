const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  // Need changing to getting from headers
  const token = req.params.token; // Assuming the token is in the URL parameter

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    // Attach the decoded payload to the request for later use
    req.user = decoded;
    next(); // Pass control to the next middleware
  });
}

module.exports = { verifyToken };
