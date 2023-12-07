const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const statusCodes = require("../util/status_code");
const common_res = require("../util/common_res");
const { validationRegister, validationLogin } = require("../util/validation");

const registration = async (req, res) => {
  try {
    const { username, email, password, contact } = req.body;
    const { error } = validationRegister.validate(req.body);

    if (error) {
      return res
        .status(statusCodes.BAD_REQUEST.code)
        .json({ error: "Validation error", error });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res
        .status(statusCodes.BAD_REQUEST.code)
        .json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
      contact,
    });

    return res
      .status(statusCodes.CREATED.code)
      .json({ message: "User registered successfully" });
  } catch (err) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ error: "Error registering user", err });
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = validationLogin.validate(req.body);

    if (error) {
      return res
        .status(statusCodes.BAD_REQUEST.code)
        .json({ error: "Validation error", error });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(statusCodes.UNAUTHORIZED.code)
        .json({ error: "User not found" });  // Custom message for non-existing user
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res
        .status(statusCodes.UNAUTHORIZED.code)
        .json({ error: "Invalid Password" });
    }

    const token = jwt.sign({ signId: user.id }, process.env.JWT_SECRET);

    return res.status(statusCodes.SUCCESS.code).json({ token });
  } catch (err) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ error: "Error in login part", err });
  }
};


module.exports = { registration, logIn };
