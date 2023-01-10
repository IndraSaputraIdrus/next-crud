const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
});

const StudentModel =
  mongoose.models.student || mongoose.model("student", studentSchema);

export default StudentModel;
