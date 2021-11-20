const mysql = require("mysql2");

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "teamproject",
});

mysqlConnection.connect((err) => {
  if (!err) console.log("DB connection succeded");
  else
    console.log(
      "DB connection failer \n Error :" + JSON.stringify(err, undefined, 2)
    );
});

module.exports = mysqlConnection;
