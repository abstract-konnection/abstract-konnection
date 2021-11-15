const {
  models: { User },
} = require('../db');

//checks to see if a user is logged in and who they say they are
const requireToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

//isAdmin could be used later on for editing products on page once that route is set up!
const isAdmin = async (req, res, next) => {
  if (!req.user.admin) {
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
