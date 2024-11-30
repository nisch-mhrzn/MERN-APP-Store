const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });
    console.log(users);
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No Users Found" });
    }
    return res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No Contacts Found" });
    }
    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};
//USser delete logic
const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id; //gets the id of the user
    await User.deleteOne({ _id: id }); //id the id from db matches the url id then delete
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, getAllContacts, deleteUserById };
