import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  console.log("Token", token);
  if (!token) {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Token verified", req.user);
    next();
  } catch (ex) {
    res.status(400).send({ error: "Invalid token." });
  }
};

export default verifyToken;
