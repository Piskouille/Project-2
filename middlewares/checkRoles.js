const checkRole = role => (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      req.flash('info', 'You lack some permissions.');
      res.redirect('/');
    }
  };


module.exports = checkRole;
