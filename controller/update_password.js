const nodemailer = require("nodemailer");
const User = require("../models/users");
const statusCodes = require("../util/status_code");
const config = require("../config/config.json");
const bcrypt = require('bcrypt')

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: config.gmailEmail,
    pass: config.gmailAppPassword,
  },
});

async function sendPasswordResetEmail(toEmail, resetToken) {
  const mailOptions = {
    from: config.gmailEmail,
    to: toEmail,
    subject: "Password Reset",
    text: `Click the following link to reset your password: http://localhost:3000/reset/${resetToken}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Password reset email sent successfully");
  } catch (error) {
    console.error("Error sending password reset email:", error);
  }
}

const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(statusCodes.NOT_FOUND.code)
        .json({ error: "User not found" });
    }

    const resetToken = generateResetToken();

    user.resetToken = resetToken;
    await user.save();

    sendPasswordResetEmail(email, resetToken);

    return res
      .status(statusCodes.SUCCESS.code)
      .json({ message: "Password reset email sent" });
  } catch (err) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ error: "Error requesting password reset", err });
  }
};

function generateRandomString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
}

function generateResetToken() {
  const tokenLength = 32;
  return generateRandomString(tokenLength);
}

const update_password = async (req, res) => {
  try {
    
    const { password, token } = req.body;
    // console.log(password);
    // console.log(token);
    const user = await User.findOne({ where: { resetToken: token } });
    
    if (!user) {
      return res
        .status(statusCodes.NOT_FOUND.code)
        .json({ error: "Invalid reset token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
     
    user.password = hashedPassword;
    user.resetToken = null;
    await user.save();

    return res
    .status(statusCodes.SUCCESS.code)
      .json({ message: "Password updated successfully" });
  } catch (err) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ error: "Error updating password", err });
  }
};
module.exports = {
  sendPasswordResetEmail,
  requestPasswordReset,
  update_password,
};
