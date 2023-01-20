import Form from "components/Form";
import FormInput from "components/FormInput";
import FormButton from "components/FormButton";
import { useState } from "react";
import { authPages } from "utils";
import Alert from "components/Alert";
import Router from "next/router";
import Link from "next/link";

export function getServerSideProps(ctx) {
  try {
    authPages(ctx);
  } catch (error) {
    console.log(error);
  }
  return { props: {} };
}

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState({});
  const registerHandler = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        confirmPassword,
      }),
    };

    const res = await fetch("/api/auth/register", options);

    const data = await res.json();
    setAlert(data);
    setTimeout(() => {
      Router.push("/auth/login");
    }, 2000);
  };
  return (
    <div className="h-screen flex items-center justify-center px-3 sm:px-0">
      <Form onSubmit={registerHandler}>
        <h1 className="text-center uppercase text-5xl sm:text-3xl mb-2">
          Register
        </h1>
        <Alert alert={alert} />
        <FormInput
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <FormInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />
        <FormInput
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          type="password"
        />
        <FormButton>Register</FormButton>
        <Link
          className="text-center text-gray-500 hover:text-white"
          href="/auth/login"
        >
          Login
        </Link>
      </Form>
    </div>
  );
}
