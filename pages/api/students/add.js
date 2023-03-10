import connect from "libs/database";
import StudentModel from "models/StudentModel";
import { authApi, wrongMethod } from "utils";

export default async function AddStudent(req, res) {
  if (req.method !== "POST") return wrongMethod(res);

  const { name, email } = req.body;
  if (!name) return res.status(400).end();
  if (!email) return res.status(400).end();

  let status = 200;
  let result = {};

  try {
    await authApi(req);

    await connect();
    const newStudent = await StudentModel.create({
      name,
      email,
    });
    await newStudent.save();
    result = { message: "success", data: { name, email } };
  } catch (error) {
    status = 400;
    result = { message: error.message };
  }
  res.status(status);
  res.json(result);
}
