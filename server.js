const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const app = express();

dotenv.config();

app.use(express.json());

let port = process.env.PORT || 3000;

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "Praveen" && password === "123") {
    const user = { username: username };
    const acess_token = jwt.sign(user, process.env.SECRETE_KEY);
    res.json({ acess_token: acess_token });
  } else {
    res.json({ message: "Invalid username or password" });
  }
});

function authenticateToken(req, res, next) {
  const headers = req.headers["authorization"];
  if (!headers) return res.status(403);
  const token = headers.split(" ")[1];
  if (!token) return res.status(403);
  try {
    jwt.verify(token, process.env.SECRETE_KEY);
    next();
  } catch (err) {
    return res.json(err);
  }
}

app.get("/employee", authenticateToken, (req, res) => {
  const empployee = [{ name: "Praveen" }, { name: "basavaraj" }];
  res.json(empployee);
});

app.get("/students", authenticateToken, (req, res) => {
  const students = [{ name: "Praveen" }, { name: "basavaraj" }];
  res.json(empployee);
});

app.listen(port, () => {
  console.log(`listening on port :  ${port}`);
});
