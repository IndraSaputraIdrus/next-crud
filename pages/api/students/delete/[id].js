import connect from "libs/database";
import StudentModel from "models/StudentModel";
import { authApi, wrongMethod } from "utils";

export default async function DeleteStudent(req, res) {
  if (req.method !== "DELETE") return wrongMethod(res);

  const { id } = req.query;
  if (!id) return res.status(400).end();

  let status = 200;
  let result = {};

  try {
    await authApi(req);

    await connect();
    const deleteStudent = await StudentModel.deleteOne({
      _id: id,
    });

    if (deleteStudent.deletedCount === 0) {
      throw new Error("data not found");
    }

    result = { message: "success", data: deleteStudent };
  } catch (error) {
    status = 400;
    console.log(error);
    result = { message: error.message };
  }
  res.status(status);
  res.json(result);
}
