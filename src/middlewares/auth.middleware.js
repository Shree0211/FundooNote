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
    console.log("User:",user);
      req.body.UserID = user.id;
      console.log("UserID:",req.body.UserID);
    next();
  } catch (error) {
    next(error);
  }
};
