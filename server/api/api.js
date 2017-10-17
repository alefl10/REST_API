const router = require("express").Router();
const user = require("./user/userRouter.js");
const category = require("./category/categoryRouter.js");
const post = require("./post/postRouter.js");

/*
* api router will mount other routers for all our resources.
* Each resource directory has a resourceRoutes.js with the
* router ready to go. Require them to their respective routes below
*/
router.use("/users", user);
router.use("/categories", category);
router.use("/posts", post);

module.exports = router;
