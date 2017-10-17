const router = require("express").Router();
const logger = require("../../util/logger.js");
const controller = require("./postController.js");

router.param("id", controller.params);

router.route("/")
  .get(controller.get)
  .post(controller.post);

router.route("/:id")
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete);

module.exports = router;
