const admin = require("../firebase/index");

const authCheck = async (req, res, next) => {
  try {
    console.log(req.headers);
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    req.user = firebaseUser;
    console.log(firebaseUser);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({}); // 401 is for unauthorized
  }
};

module.exports = { authCheck };
