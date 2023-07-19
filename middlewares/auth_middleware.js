const jwt = require("jsonwebtoken");
const {Users} = require("../models");


// 사용자 인증 미들웨어
const verifyToken = async (req, res, next) => {
  console.log(req.cookies)
  if (!req.cookies || typeof req.cookies !== 'object') {
    console.error('No cookies found.');
    res.status(401).send({ errorMessage: 'No cookies found.' });
    return;
    }

  const { Authorization } = req.cookies;
  console.log(Authorization)
  const [authType, authToken] = (Authorization ?? "").split(" ");
  // console.log(authType)
  // console.log(authToken)
    if (!authToken || authType !== "Bearer") {
    res.status(401).send({
      errorMessage: "쿠키 보고싶다" ,//! 무조건 수정해야함
    });
    return;
  } 

  try {
    const { id } = jwt.verify(authToken, 'my-secret-key');
    const user = await Users.findOne({where:{id}});
    res.locals.user = user;
    
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send({
      errorMessage: "22222.", //! 무조건 수정해야함
    });
  }
};

module.exports = verifyToken;