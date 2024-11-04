const jwt = require("jsonwebtoken");
const User = require("../models/user_model");

const auth = async (req, res, next) => {
  try {
    // if (!req.cookies) {
    //   return res.status(401).send("Please login!");
    // }
    // const token = req.cookies.access_token?.split(" ")[1];
     if (!req.headers) {
      return res.status(404).send(" please login !");
    }
    const token = req?.headers?.authorization.split(" ")[1]
    if (!token) {
      return res.status(401).send("Please login!");
    }

    const SECRETKEY = process.env.SECRETKEY;
    const decoded = jwt.verify(token, SECRETKEY);

    const user = await User.findById(decoded.id);
    if (!user || !user.tokens.includes(token)) {
      return res.status(401).send("Please login!");
    }

    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(500).send(e.message);
  }
};


const adminAuth = async (req, res, Next) => {
  try {
    // if (!req.cookies) {
    //   return res.status(401).send("Please login!");
    // }
    // const token = req.cookies.access_token?.split(" ")[1];
    if (!req.headers) {
      return res.status(404).send(" please login !");
    }
    const token = req?.headers?.authorization.split(" ")[1]
    if (!token) {
      return res.status(401).send(" please login !");
    }

    const SECRETKEY = process.env.SECRETKEY;

    const result =  jwt.verify(token, SECRETKEY, { complete: true });

    if (!result) {
      return res.status(400).send(" please signup or login !");
    }

    const user_1 = await User.findById(result.payload.id);
    req.user = user_1;

    if (!user_1.isAdmin) {
      return res.send(" Available for ADMIN ");
    } else {
      Next();
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
};
module.exports = {
  auth,
  adminAuth,
};
