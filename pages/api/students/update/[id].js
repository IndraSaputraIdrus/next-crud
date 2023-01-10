import connect from "libs/database";
import StudentModel from "models/StudentModel";
import { authApi, bodyEmpty, wrongMethod } from "utils";

export default async function UpdateStudent(req, res) {
  if (req.method !== "PUT") return wrongMethod(res);

  const { id } = req.query;
  if (!id) return res.status(400).end();

  const { name, email } = req.body;
  bodyEmpty([name, email], res);

  let status = 200;
  let result = {};

  try {
    await authApi(req);

    await connect();
    const updateStudent = await StudentModel.updateOne(
      {
        _id: id,
      },
      {
        name,
        email,
      }
    );
    result = { message: "success", data: updateStudent };
  } catch (error) {
    status = 400;
    result = { message: error.message };
  }
  res.status(status);
  res.json(result);
}
