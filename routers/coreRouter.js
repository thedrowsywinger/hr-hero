const router = require("express").Router();

const ApiRoutes = require("../utils/apiRoutes");

const {
  testController,
  seederRequestController,
  registerEmployeeController,
  loginController
} = require("./../controllers/coreController");

const { validateYupSchema } = require("../middlewares/validation");

const {
  userProfileRegistrationSchema,
} = require("../validations/coreSchema");

const { auth } = require("../middlewares/auth");

router.post("/test/", testController);
router.post(ApiRoutes.SEEDER, seederRequestController);
router.post(
  ApiRoutes.REGISTER_USER,
  auth,
  validateYupSchema(userProfileRegistrationSchema),
  registerEmployeeController
)
router.post(
  ApiRoutes.LOGIN,
  loginController
)

module.exports = router;