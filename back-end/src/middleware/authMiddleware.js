const jwt = require("jsonwebtoken");

// Middleware function to verify JWT token
function authenticateToken(req, res, next) {
  // Get the token from the request headers, e.g., 'Authorization: Bearer <token>'
  const token = req.header("Authorization")?.split(" ")[1];
  console.log("Header", req.header);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    // Store the user object in the request for use in protected routes
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
