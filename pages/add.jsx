import Alert from "components/Alert";
import Form from "components/Form";
import FormInput from "components/FormInput";
import Router from "next/router";
import { useState } from "react";

export default function AddData() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5kcmFpbiIsImhhc2hQYXNzd29yZCI6IiQyYiQxMCRRUUIudjJLZmVITjAwa2duNUFmREd1b2ljZG1MZWdUanp4UU5oa0hJenluLmV1VTVvWDYvRyIsImlhdCI6MTY3Mzk2NDM5OSwiZXhwIjoxNjc0NTY5MTk5fQ.tOahd3bU1ZAyCj4hn1l3SBp7TcHk7et76KWZvCf-Hyw";
  const formAddHandler = () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        email,
      }),
    };
    fetch("api/students/add", options)
      .then((res) => res.json())
      .then((data) => {
        setAlert(data);
        setTimeout(() => Router.push("/"), 2000);
      })
      .catch((err) => setAlert(err));
  };
  return (
    <div className="container mx-auto flex justify-center">
      <div className="py-5 text-center w-3/6">
        <h1 className="font-bold text-3xl mb-5">Form add data</h1>
        <Form onSubmit={formAddHandler}>
          <Alert alert={alert} />
          <FormInput
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Name..."
          />
          <FormInput
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email..."
          />
        </Form>
      </div>
    </div>
  );
}
