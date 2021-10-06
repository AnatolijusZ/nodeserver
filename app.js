const express = require('express')
const app = express()
const port = 3003
const mysql = require('mysql')
const cors = require("cors")
app.use(cors())

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'articles'
})

con.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Yes');
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/labas', (req, res) => {
    res.send('Labas Petrai ir Jonai!')
  })

  app.get('/labas/:id', (req, res) => {
    res.send(`Pats tu ${req.params.id}`)
  })

app.get('/posts', (req, res) => {
    con.query('SELECT * FROM posts', (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results);
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})