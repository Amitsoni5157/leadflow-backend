const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, "secretkey");
    
    console.log("DECODED:", decoded);
    
    req.user = decoded; // 🔥 userId yaha milega

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};