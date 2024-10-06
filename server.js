import mysql from "mysql2";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const port = 3001;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err);
    process.exit(1); // Salir del proceso con un código de error
  }
  console.log("Conectado a la base de datos");
});

// Define a secret key for generating JWTs
const secretKey = process.env.SECRET_KEY;
if (!secretKey) {
  console.error("Error: La variable de entorno SECRET_KEY no está configurada");
  process.exit(1); // Salir del proceso con un código de error
}

// Define a function to authenticate users
function authenticateUser(username, password) {
  // Check if the username and password match a user in your database
  const user = getUserByUsername(username);
  if (!user) {
    return null;
  }
  const isValid = bcrypt.compareSync(password, user.password);
  if (!isValid) {
    return null;
  }
  return user;
}

// Define a function to generate a JWT for a user
function generateJWT(user) {
  const payload = {
    username: user.username,
    role: user.role,
  };
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  return token;
}

// Define a middleware function to authenticate and authorize requests
function authenticateAndAuthorize(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Invalid token" });
  }
}

// Define a route to fetch the latest GPS data
app.get("/latest-gps", authenticateAndAuthorize, (req, res) => {
  // Check if the user has the necessary permissions to access the data
  if (req.user.role !== "admin") {
    return res.status(403).send({ message: "Forbidden" });
  }
  // Fetch the latest GPS data
  const query = {
    sql: "SELECT * FROM gps ORDER BY datetime DESC LIMIT 1",
    values: [], // No values needed for this query
  };

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
      return;
    }
    if (result.length === 0) {
      res.status(404).send("No data found");
    } else {
      res.json(result[0]); // Send the latest record as JSON
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
