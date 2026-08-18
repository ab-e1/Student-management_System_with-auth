require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5000,
  jwtSecret:
    process.env.JWT_SECRET ||
    "JWT_SECRETS_IS_THE_ONE_EHO_SET_THIS_LONG_ASS_TEXT",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
};
