const express = require("express");
const app = express();
const port = 3003;
const mysql = require("mysql");
const cors = require("cors");
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "articles",
});

con.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Yes");
});

//app.get('/', (req, res) => {
//  res.send('Hello World!')
//})

//app.get('/labas', (req, res) => {
//    res.send('Labas Petrai ir Jonai!')
//  })

//app.get('/labas/:id', (req, res) => {
//    res.send(`Pats tu ${req.params.id}`)
//  })

//sita vieta iraso nauja post
app.post("/posts", (req, res) => {
  const sql = `
  INSERT INTO posts
  (title, body)
  VALUES (?, ?)
  `;
  con.query(sql, [req.body.title, req.body.body], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});
//Trina posta
// DELETE FROM table-name
//WHERE some_column = some_value
app.delete("/posts:id", (req, res) => {
  const sql = `
  DELETE FROM posts
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

//rodo visus posts
app.get("/posts", (req, res) => {
  console.log(req.body.title);
  con.query("SELECT * FROM posts ORDER BY id DESC", (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
