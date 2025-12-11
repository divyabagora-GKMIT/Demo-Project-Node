const express = require("express");
const { addressController } = require("../controllers");
const validate = require("../middlewares/validate");
const addressSchema = require("../validators/address.validation");
const paramSchema = require("../validators/params.validation");
const router = express.Router();

router.post("/", validate.bodyValidate(addressSchema), addressController.addAddress);
router.get("/", addressController.viewAllAddresses);
router.get("/:id", validate.paramValidate(paramSchema), addressController.viewAddress);
router.patch("/:id", validate.paramValidate(paramSchema), addressController.updateAddress);
router.post("/:id", validate.paramValidate(paramSchema), addressController.deleteAddress);

module.exports = router;
