const router = require("express").Router();
const User = require("../../models/User");
const checkRole = require('../../middlewares/checkRoles')


router.get("/users-manage", checkRole("ADMIN"), async (req, res, next) => {
  let loggedIn = false;
    if (req.isAuthenticated() || req.session.currentUser) {
      loggedIn = true;
    }
    const user = req.isAuthenticated() ? req.user : req.session.currentUser;
    const isAdmin = user?.role === "ADMIN" ? true : false;
  try {
    const users = await User.find();
    res.render("admin/users", {
      users,
      user,
      loggedIn,
      isAdmin,
      scripts: ["bugerMenu.js", "userModal.js"],
    });
  } catch (error) {
    next(error);
  }
});
router.post("/users/:id", checkRole("ADMIN"), async (req, res, next) => {
  try {
    console.log(req.body);
    await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect("/admin/users-manage");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
