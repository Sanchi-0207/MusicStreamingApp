export const authorizeRole = (role) => {
  return (request, response, next) => {
    if (request.body.decodedToken.role !== role) {
      return response.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
