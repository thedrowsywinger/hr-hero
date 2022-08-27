const router = require("express").Router();

const ApiRoutes = require("../utils/apiRoutes");

const {
  checkInController,
  checkOutController,
  applyLeaveController,
  processLeaveController,
  attendanceReportDailyController
} = require("../controllers/attendanceController");

const { validateYupSchema } = require("../middlewares/validation");
const {
  applyLeaveSchema,
  processLeaveSchema
} = require("../validations/leaveSchema")

const { auth, checkManager } = require("../middlewares/auth");

router.post(ApiRoutes.CHECKIN, auth, checkInController);
router.post(ApiRoutes.CHECKOUT, auth, checkOutController);
router.post(ApiRoutes.APPLY_LEAVE, auth, validateYupSchema(applyLeaveSchema), applyLeaveController);
router.post(ApiRoutes.PROCESS_LEAVE, auth, checkManager, validateYupSchema(processLeaveSchema), processLeaveController);
router.post(ApiRoutes.ATTENDANCE_REPORT_DAILY, auth, attendanceReportDailyController)


module.exports = router;
