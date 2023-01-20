import { useState } from "react";
import Router from "next/router";
import Cookies from "js-cookie";
import Form from "components/Form";
import FormButton from "components/FormButton";
import FormInput from "components/FormInput";
import Alert from "components/Alert";
import { authPages } from "utils";
import Link from "next/link";

export async function getServerSideProps(ctx) {
  try {
    authPages(ctx);
  } catch (err) {
    console.log(err);
  }

  return { props: {} };
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});

  const loginHandler = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    };
    const res = await fetch("/api/auth/login", options);
    const data = await res.json();
    if (!data.token) {
      return setAlert(data);
    }
    Cookies.set("token", data.token, { expires: 7, sameSite: "none" });
    Router.push("/");
  };

  return (
    <div className="h-screen flex items-center justify-center px-3 sm:px-3">
      <Form onSubmit={loginHandler}>
        <h1 className="text-center uppercase text-5xl sm:text-3xl mb-2">
          Login
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
        <FormButton>Login</FormButton>
        <Link
          className="text-center text-gray-500 hover:text-white"
          href="/auth/register"
        >
          Register
        </Link>
      </Form>
    </div>
  );
}
