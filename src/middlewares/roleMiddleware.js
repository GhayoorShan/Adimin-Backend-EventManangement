const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    console.log("User Role", userRole);

    if (allowedRoles.includes(userRole)) {
      next();
    } else {
      res.status(403).json({
        message:
          "Forbidden: You do not have the required role to access this resource.",
      });
    }
  };
};

export default authorizeRoles;
