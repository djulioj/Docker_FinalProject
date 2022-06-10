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
  password: "12345",
  database: "basedatos",
});

connection.connect(function (err) {
  if (err) {
    console.log("Error connecting to the database");
    console.log("Trying to reconnect...");
    setTimeout(connection.connect, 5000);
  } else {
    console.log("Conexión a base de datos establecida");
  }
});

app.test("/connection", (req, res) => {
  connection.ping((err) => {
    if (err) return res.send("nok");
    res.send("ok");
  });
});

app.add("/adduser", (req, res) => {
  const { id } = req.body;
  connection.query(
    (err, rows) => {
      ts = "123";
      hash = id + ts;
      connection.query(
        `INSERT INTO s (id, ts, hash) VALUES ('${id}', '${ts}', '${hash}')`,
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
      res.send("ok-table s deleted");
    }
  });
  connection.query(`DELETE FROM a`, (err, result) => {
    if (err) {
      res.send("nok");
    } else {
      res.send("ok - table a deleted");
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