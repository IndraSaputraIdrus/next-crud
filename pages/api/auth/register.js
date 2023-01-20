import connect from "libs/database";
import UsersModel from "models/UsersModel";
import bcrypt from "bcrypt";
import { bodyEmpty, wrongMethod, passwordMatch } from "utils";

export default async function Register(req, res) {
  if (req.method !== "POST") return wrongMethod(res);

  const { username, password, confirmPassword } = req.body;

  bodyEmpty([username, password, confirmPassword], res);

  let status = 200;
  let result = {};

  try {
    await connect();

    await passwordMatch(password, confirmPassword);

    const hashPassword = await bcrypt.hash(password, 10);

    const findUsername = await UsersModel.find({
      username,
    });
    if (findUsername.length > 0) throw Error("Username already exists");

    const user = await UsersModel.create({
      username,
      password: hashPassword,
    });

    await user.save();

    result = { message: "success" };
  } catch (error) {
    status = 400;
    result = { message: error.message };
  }
  res.status(status);
  res.json(result);
}
