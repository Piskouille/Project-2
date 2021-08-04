const checkRole = (role) => (req, res, next) => {
  if (
    (req.isAuthenticated() || req.session.currentUser) &&
    (req.user?.role === role || req.session.currentUser?.role === role)
  ) {
    return next();
  } else {
    req.flash('info', 'You lack some permissions.');
    res.redirect('/');
  }
};

module.exports = checkRole;
