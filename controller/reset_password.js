const User = require("../models/users");
const bcrypt = require("bcrypt");
const { validationResetpassword } = require("../util/validation");
const statusCodes = require("../util/status_code");

const resetPassword = async (req, res) => {
  try {
    const { email , password } = req.body;

   
    
    const { error } = validationResetpassword.validate(req.body);

    if (error) {
      return res
        .status(statusCodes.BAD_REQUEST.code)
        .json({ error: "Validation error", error });
    }

   
    if (!email || ! password) {
      return res
        .status(statusCodes.BAD_REQUEST.code)
        .json({ error: "Email and  password are required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(statusCodes.NOT_FOUND.code)
        .json({ error: "User not found" });
    }


    const hashedNewPassword = await bcrypt.hash( password, 10);

  
    await user.update({ password: hashedNewPassword });

    return res
      .status(statusCodes.SUCCESS.code)
      .json({ message: "Password reset successful" });
  } catch (err) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ error: "Error resetting password", err });
  }
};

module.exports = { resetPassword };
