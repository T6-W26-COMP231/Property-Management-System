const { auth } = require("express-oauth2-jwt-bearer");
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
  tokenSigningAlg: "RS256",
});

module.exports = { checkJwt}

// // TEMPORARY BYPASS FOR POSTMAN TESTING
// const checkJwt = (req, res, next) => {
//   // faking that a user is logged in
//   req.auth = {
//     payload: {
//       sub: "auth0|postman-test-123"
//     }
//   };
//   next();
// };

// module.exports = {checkJwt};