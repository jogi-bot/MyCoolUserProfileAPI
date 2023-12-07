const User = require("../models/users");
const { validationUpdateProfile } = require("../util/validation");
const statusCodes = require("../util/status_code");

const updateProfile = async (req, res) => {
  try {
    const { email,  contact, username } = req.body;
    const { error } = validationUpdateProfile.validate(req.body);

    if (error) {
      return res
        .status(statusCodes.BAD_REQUEST.code)
        .json({ error: "Validation error", error });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(statusCodes.NOT_FOUND.code)
        .json({ error: "User not found" });
    }


    const updateFields = {};

    if (email) {
      updateFields.email = email;
    }
    if(username){
        updateFields.username = username;
    }

    if (contact) {
      updateFields.contact = contact;
    }

    await user.update(updateFields);

    return res
      .status(statusCodes.SUCCESS.code)
      .json({ message: "Profile updated successfully" });
  } catch (err) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR.code)
      .json({ error: "Error updating profile", err });
  }
};

module.exports = { updateProfile };
