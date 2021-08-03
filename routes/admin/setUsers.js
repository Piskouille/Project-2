const router = require("express").Router();
const User = require("../../models/User");

router.get("/users-manage", async (req, res, next) => {
  try {
    const users = await User.find();
    res.render("users", { users: users });
  } catch (error) {
    next(error);
  }
});
router.post("/users/:id", async (req, res, next) => {
  try {
    console.log(req.body);
    await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect("/admin/users-manage");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
