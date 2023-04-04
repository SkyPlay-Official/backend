const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  }
},
  {
    timestamps: true
  }
);

const UserModel = mongoose.model("Users", UserSchema)
module.exports = UserModel;
