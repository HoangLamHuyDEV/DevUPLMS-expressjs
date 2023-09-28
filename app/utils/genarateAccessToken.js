const jwt = require("jsonwebtoken");

class GenerateAccessToken {
  static GenerateAccessTokenForUser(
    userAccount_ID,
    userDetail_ID,
    rolename
  ) {
    return jwt.sign(
      {
        userAccount_ID: userAccount_ID,
        userDetail_ID: userDetail_ID,
        userRole:rolename
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "120m" }
    );
  }
  static GenerateAccessTokenForOwnerWhenLogin(
    userAccount_ID,
    userDetail_ID,
    rolename,
  ) {
    return jwt.sign(
      {
        userAccount_ID: userAccount_ID,
        userDetail_ID: userDetail_ID,
        userRole: rolename,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "120m" }
    );
  }

  static GenerateAccessTokenForLesson(){

  }


}

module.exports = GenerateAccessToken;