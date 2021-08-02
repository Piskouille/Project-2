function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.flash('info', 'You need to login / register')
      res.redirect('/');
    }
  }
  
  module.exports = isAuthenticated