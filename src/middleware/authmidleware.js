const jwt = require("jsonwebtoken");
const privateKey = process.env.privateKey;



const authorization = async (req, res, next) => {
  console.log(req.headers.authorization);
  let token = req.headers.authorization;
  try {
    if (token) {
      var decoded = jwt.verify(token, privateKey);
      req.body.user = decoded.id;
      next();
    } else {
      res.send({msg:"You are Not authorized"})
    }
   
  } catch (err) {
    
 }
};

module.exports = { authorization };
