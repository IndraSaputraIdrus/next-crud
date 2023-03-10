import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UsersModel = mongoose.models.user || mongoose.model("user", usersSchema);

export default UsersModel;
