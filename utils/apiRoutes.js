const ApiRoutes = {
  API: "/api",

  // context
  CORE: "/core",

  // seeder
  SEEDER: "/seeder",

  // core
  REGISTER_USER: "/register/user-profile/",
  LOGIN: "/login/",
  GET_USERS: "/get-users/",
  GET_USER_BY_ID: "/get-user/",

  // attendance
  CHECKIN: "/check-in",
  CHECKOUT: "/check-out",

  // leave
  APPLY_LEAVE: "/apply-leave",
  PROCESS_LEAVE: "/process-leave",

  // report
  ATTENDANCE_REPORT_DAILY: "/report/daily/",
  ATTENDANCE_REPORT_WEEKLY: "/report/weekly/",
  ATTENDANCE_REPORT_MONTHLY: "/report/monthly/",
}

module.exports = ApiRoutes;