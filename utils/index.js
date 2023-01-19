import jwt from "jsonwebtoken";

export function wrongMethod(res) {
  return res.status(405).end();
}

export function bodyEmpty(fields, res) {
  if (Array.isArray(fields)) {
    fields.forEach((field) => {
      if (!field) return res.status(400).end();
    });
  }

  if (!fields) {
    return res.status(400).end();
  }
}

export function passwordMatch(password, confirmPassword) {
  return new Promise((resolve, reject) => {
    if (password !== confirmPassword) {
      reject(new Error("password dont match"));
    } else {
      resolve(true);
    }
  });
}
export function authApi(req) {
  return new Promise((resolve, reject) => {
    const authorization = req.headers.authorization;
    if (!authorization) return reject(new Error("not authorized"));

    const splitAuth = authorization.split(" ");
    const tokenType = splitAuth[0];
    if (tokenType !== "Bearer") return reject(new Error("Invalid token type"));

    const token = jwt.verify(splitAuth[1], process.env.PRIVATE_KEY);

    return resolve(token);
  });
}

export function fetchUrl() {
  return process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
}
