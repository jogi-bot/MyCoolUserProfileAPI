const joi = require("joi");

let email = joi.string().email().required();
let username = joi.string().required(); 
let contact = joi.string().required().length(10).pattern(/^[0-9]+$/).required();

let password = joi
  .string()
  .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
  .required().messages({'string.pattern.base': 'password must be an complex'})

  let newPassword = joi.string().min(8).required();


const validationRegister = joi.object({
  username: username,
  email: email,
  password: password,
  contact:contact
  
});

const validationLogin = joi.object({
  email: email,
  password: password,
});

const validationUpdateProfile = joi.object({
  username:joi.string(),
  email: email,
 contact: contact

});

const validationResetpassword = joi.object({

  email: email,
  password : password
  
  


});











module.exports = {
  validationRegister,
  validationLogin,
  validationResetpassword,

  validationUpdateProfile,

};
