import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verified;
    return next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
