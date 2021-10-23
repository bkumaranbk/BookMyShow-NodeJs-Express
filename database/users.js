const mongoose = require("mongoose");

//create Publication schema
const usersSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const UserModel = mongoose.model("users", usersSchema);

module.exports = UserModel;
