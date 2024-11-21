//jwt token verify

const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const authMiddleware = async (req, res, next) => {
  //in middleware we need to pass extra agrument as next
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  //removing bearer prefix
  const jwtToken = token.replace("Bearer", "").trim();
  console.log(jwtToken);

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    console.log(isVerified);

    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    }); //donot send password
    console.log(userData);
    req.user = userData;
    req.token = token;
    req.userID = userData._id;

    next();
  } catch (error) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
};
module.exports = authMiddleware;
