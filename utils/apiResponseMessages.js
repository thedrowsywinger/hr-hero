const ApiResponseMessages = {
  SUCCESS: "Succesful",

  FAILED: "Failed",

  INVALID_JWT: "Invalid JWT. Please Include a proper JWT authorized key",
  INVALID_ACCOUNT_TYPE: "Invalid Account Type",
  INVALID_USER: "Invalid User",

  USERNAME_PASSWORD_MISMATCH: "This username and password combination does not match",
  USERNAME_ALREADY_EXISTS: "This username already exists",
  UNAUTHORIZED_ACCESS: "Current User does not have access.",
  NO_OTHER_USER_ALLOWED: "We are currently not allowing other types of user registration",

  SYSTEM_ERROR: "Sorry, something went wrong",
}

module.exports = ApiResponseMessages