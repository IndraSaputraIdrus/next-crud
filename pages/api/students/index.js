import connect from "libs/database";
import { wrongMethod, authApi } from "utils";
import StudentModel from "models/StudentModel";

export default async function Students(req, res) {
  if (req.method !== "GET") return wrongMethod(res);

  let status = 200;
  let result = {};

  try {
    await authApi(req);

    await connect();
    const students = await StudentModel.find();
    result = { message: "success", data: students };
  } catch (error) {
    status = 400;
    result = { message: error.message };
  }
  res.status(status);
  res.json(result);
}
