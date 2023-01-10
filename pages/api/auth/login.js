import connect from "libs/database";
import UsersModel from "models/UsersModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { bodyEmpty, wrongMethod } from "utils";

export default async function Login(req, res) {
  if (req.method !== "POST") return wrongMethod(res);

  const { username, password } = req.body;
  bodyEmpty([username, password], res);

  let status = 200;
  let result = {};

  try {
    await connect();

    const user = await UsersModel.findOne({
      username,
    });

    if (!user) throw Error("user not found");

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) throw Error("wrong password");

    const token = jwt.sign({ username, password }, process.env.PRIVATE_KEY, {
      expiresIn: "7d",
    });

    result = { message: "success", token };
  } catch (error) {
    status = 400;
    result = { message: error.message };
  }
  res.status(status);
  res.json(result);
}
