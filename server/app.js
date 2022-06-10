const express = require("express");
const app = express();
const mysql = require("mysql");
const body_parser = require("body-parser");
const util = require("util");
const { read } = require("fs");
app.use(express.json());
app.use(require("morgan")("dev"));
app.use(body_parser.json());
const PORT = process.env.PORT || 3001;

const connection = mysql.createConnection({
  host: "db",
  user: "root",
  password: "123",
  database: "proyecto",
});

//this method try to connect to the database until it is successful

  connection.connect(function (err) {
    if (err) {
      //retry connection
      console.log("Error connecting to the database");
      console.log("Trying to reconnect...");
      setTimeout(connection.connect, 5000);
    } else {
      console.log("Conexión a base de datos establecida");
    }
  });




const query = util.promisify(connection.query).bind(connection);

app.get("/connection", (req, res) => {
  connection.ping((err) => {
    if (err) return res.send("nok");
    res.send("ok");
  });
});

app.post("/adduser", (req, res) => {
  const { id } = req.body;
  connection.query(
    (err, rows) => {
      ts = java.time.LocalDateTime.now();
      hash = id + ts;
      connection.query(
        `INSERT INTO s (id, ts, hash) VALUES ('${id}', ${ts}, '${hash}')`,
      );
      if (err) {
        res.send("nok");
      } else {
        res.send("ok");
      }
    }
  );
});


app.delete("/delete", (req, res) => {
  connection.query(`DELETE FROM s`, (err, result) => {
    if (err) {
      res.send("nok");
    } else {
      res.send("ok");
    }
  });
  connection.query(`DELETE FROM a`, (err, result) => {
    if (err) {
      res.send("nok");
    } else {
      res.send("ok");
    }
  });
});



app.get('/jsontables', function (req, res) { 
  connection.query('SELECT * FROM s', function(err, rows, fields)   
  {   
      if (err){
        res.send('nok')
      }else {
        res.json(rows); 
      }
  });
});

app.get('/jsontablea', function (req, res) { 
  connection.query('SELECT * FROM a', function(err, rows, fields)   
  {   
      if (err){
        res.send('nok')
      }else {
        res.json(rows); 
      }
  });
});

app.use((_, res, next) => {
  res.status(404);
});

// connection.end(function(){
//     console.log('Conneción terminada');
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});