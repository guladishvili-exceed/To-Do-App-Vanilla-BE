const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  console.log("-----token", token);
  if (!token) return res.status(401).send("Access Denied");
  try {
    const verified = jwt.verify(token, "secretkey");
    req.user = verified;
    next();
    console.log("-----verified", verified);
  } catch (err) {
    res.status(400).send("Invalid token");
    next();
  }
};
