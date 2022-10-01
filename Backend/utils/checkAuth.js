import jwt from "jsonwebtoken";

export default (request, response, next) => {
  const token = (request.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decodeToken = jwt.verify(token, "secret123");
      request.userId = decodeToken._id;
      next();
    } catch (err) {
      return response.status(403).json({
        message: "Not decode token",
      });
    }
  } else {
    return response.status(403).json({
      message: "Not success",
    });
  }
};
