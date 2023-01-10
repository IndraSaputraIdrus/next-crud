import connect from "libs/database";
import StudentModel from "models/StudentModel";
import { authApi, wrongMethod } from "utils";

export default async function GetStudentById(req, res) {
  if (req.method !== "GET") return wrongMethod(res);

  const { id } = req.query;
  if (!id) return res.status(400).end();

  let status = 200;
  let result = {};

  try {
    await authApi(req);

    await connect();
    const student = await StudentModel.findOne({
      _id: id,
    });

    result = { message: "success", data: student };
  } catch (error) {
    status = 400;
    console.log(error);
    result = { message: error.message };
  }
  res.status(status);
  res.json(result);
}
