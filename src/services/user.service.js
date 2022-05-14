  import User from '../models/user.model';
const bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken';
import {main} from '../utils/helper';

export const login = async (body) => {
  const data = await User.findOne({ email: body.email });
  console.log("email",data)
  if (data == null) {
    throw new Error("User doesnt exist");
  } else {
    const result = await bcrypt.compare(body.password,data.password);
    if (result) {
      var token = jwt.sign({"firstname": data.firstname,"id":data._id,"email":data.email}, process.env.SECRET_KEY);
      return token;
    }
    else {
      throw new Error("Incorrect Password");
    }
  }
};

export const newUser = async (body) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashPassword = await bcrypt.hash(body.password, salt);
  body.password = hashPassword;
  const data = await User.create(body);
  return data;
};

export const forgotpassword = async (body) => {
  const searchdata = await User.findOne({ email: body.email });
 // console.log("Searchdata",searchdata);
  //console.log("body.email",body.email);
  
  if (body.email==searchdata.email) 
  {
      var token = jwt.sign({"id": searchdata._id,"email":searchdata.email}, process.env.SECRETKEY);
      const result = await main(searchdata.email,token)
      return token;
    }
    else {
      throw new Error("Email doesnt exist");
    }
  };

  
  export const resetpassword = async (body) => {
  //  console.log("body is" ,body);
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(body.password, salt);
    body.password = hashPassword;
    const data = await User.findOneAndUpdate(
      { email: body.email },
      { password: hashPassword }
    );
    //console.log("data is " ,data);
    return data;
  };