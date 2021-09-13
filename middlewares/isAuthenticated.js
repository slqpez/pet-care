const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  try {
    const authorization = req.get("authorization");
    let token = null;

    if (authorization && authorization.toLowerCase().startsWith("bearer")) {
      token = authorization.substring(7);
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!token || !decodedToken.id) return res.status(401).json({ msg: "Token inválido o faltante." });
    
    req.userId = decodedToken.id


  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
 
  next();
  
};

module.exports = isAuthenticated;
