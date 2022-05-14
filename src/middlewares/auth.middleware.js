import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('token');

    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };


    const user = await jwt.verify(bearerToken, process.env.SECRET_KEY);
   
      req.body.UserID = user.id;
   
    next();
  } catch (error) {
    next(error);
  }
};


export const userAuthpassword = async (req, res, next) => {
  try {
    let bearerToken = req.headers['token'];
    console.log("Token generated is :",bearerToken);
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
      const user = await jwt.verify(bearerToken, process.env.SECRETKEY);
      req.body.email=user.email;
      console.log("body",req.body.email);
    next();
  } catch (error) {
    next(error);
  }
};