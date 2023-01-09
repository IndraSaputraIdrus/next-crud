import connect from "libs/database";
import StudentModel from "models/StudentModel";

export default async function UpdateStudent(req, res) {
  if (req.method !== "PUT") return res.status(405).end();

  const { id } = req.query;
  if (!id) return res.status(400).end();

  const { name, email } = req.body;
  if (!name) return res.status(400).end();
  if (!email) return res.status(400).end();

  let status = 200;
  let result = {};

  try {
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
