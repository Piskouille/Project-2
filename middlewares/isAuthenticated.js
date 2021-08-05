function isAuthenticated(req, res, next) {
    if (req.isAuthenticated() || req.session.currentUser) {
      return next();
    } else {
      req.flash('info', 'You need to login / register')
     // res.redirect('/');
     res.send('<script>document.getElementById("user").click()</script>')
    }
  }
  
  module.exports = isAuthenticated