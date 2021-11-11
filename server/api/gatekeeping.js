const {
  models: { User },
} = require('../db');

//checks to see if a user is logged in and who they say they are
const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    res.status(403).send("You aren't authorized for this dawg");
  } else {
    //if a user is an admin, we move on to the next middleware
    next();
  }
};

module.exports = {
  requireToken,
  isAdmin,
};
