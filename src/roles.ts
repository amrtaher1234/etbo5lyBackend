import { AccessControl } from "accesscontrol";
const ac = new AccessControl();

export const roles = (function () {
  ac.grant("eater").readOwn("profile").readAny("meal");

  ac.grant("cheif").extend("eater").createAny("meal");

  ac.grant("godfather")
    .extend("eater")
    .extend("cheif")
    .updateAny("profile")
    .deleteAny("profile");
  return ac;
})();

export const grantAccess = function (action, resource) {
  return async (req, res, next) => {
    try {
      const user = res.locals.loggedInUser || {};
      const permission = roles.can(user.role)[action](resource);
      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have enough permission to perform this action",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export const allowIfLoggedin = async (req, res, next) => {
  try {
    const user = res.locals.loggedInUser;
    if (!user)
      return res.status(401).json({
        error: "You need to be logged in to access this route",
      });
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
