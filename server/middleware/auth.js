const admin = require("../firebase/index");

const authCheck = async (req, res, next) => {
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    if (!firebaseUser.displayName) {
      // Fetch the full user profile using their UID
      const userProfile = await admin.auth().getUser(firebaseUser.uid);

      // Add the displayName from the full user profile
      firebaseUser.name = userProfile.displayName;
    }
    req.user = firebaseUser;
    // console.log(firebaseUser);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({}); // 401 is for unauthorized
  }
};

module.exports = { authCheck };
