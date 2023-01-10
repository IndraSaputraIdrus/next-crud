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
