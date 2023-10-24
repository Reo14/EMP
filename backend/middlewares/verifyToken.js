const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  let token = null;
  console.log("authHeader: ", authHeader);
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("verifyToken: err: ", err);
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    // Attach the decoded payload to the request for later use
    req.user = decoded;
    console.log("verifyToken: req.user: ", req.user);
    next(); // Pass control to the next middleware
  });
}

module.exports = { verifyToken };
