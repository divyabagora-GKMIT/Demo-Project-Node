const express = require("express");
const { userController } = require("../controllers");
const validate = require("../middlewares/validate.js");
const userSchema = require("../validators/user.validation");
const userUpdateSchema = require("../validators/user.update.validation.js");
const paramSchema = require("../validators/params.validation.js");
const paginationSchema = require("../validators/pagination.validation.js");
const router = express.Router();

router.post("/", validate.bodyValidate(userSchema), userController.createUser);
router.get("/", validate.paginationValidate(paginationSchema), userController.viewAllUsers);
router.get("/:id", validate.paramValidate(paramSchema), userController.viewUser);
router.patch("/:id", validate.paramValidate(paramSchema), validate.bodyValidate(userUpdateSchema), userController.updateUser);
router.delete("/:id", validate.paramValidate(paramSchema), userController.deleteUser);
router.get("/:id/addresses", validate.paramValidate(paramSchema), userController.getAddresses);

module.exports = router;
