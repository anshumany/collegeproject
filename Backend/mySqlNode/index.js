const express = require("express");
const app = express();
const mysqlConnection = require("./database/conn");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ success: "true" });
});

// Get ALl Employee
app.get("/api/v1/employees", (req, res) => {
  mysqlConnection.query("SELECT * FROM employee", (err, rows, fields) => {
    if (!err) {
      console.log(rows);
      res.send(rows);
    } else console.log(err);
  });
});

// Get Employee By Id
app.get("/api/v1/employees/:id", (req, res) => {
  const id = req.params.id;
  mysqlConnection.query(
    `SELECT * FROM employee where rno = ${id}`,
    (err, rows, fields) => {
      if (!err) {
        console.log(rows);
        res.send(rows);
      } else console.log(err);
    }
  );
});

app.delete("/api/v1/employees/:id", (req, res) => {
  const id = req.params.id;

  mysqlConnection.query(
    `DELETE FROM employee where empcode = ${id}`,
    (err, rows, fields) => {
      if (!err) {
        res.send("DELETED successfully.");
      } else {
        console.log(err);
      }
    }
  );
});

app.post("/api/v1/employees/", async (req, res) => {
  const data = {
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    doj: req.body.doj,
    rno: req.body.rno,
    salary: req.body.salary,
    empcode: req.body.empcode,
  };

  mysqlConnection.query(
    `INSERT INTO employee (name, designation , email , phone , doj , rno, salary, empcode) VALUES (?,?,?,?,?,?,?,?)`,
    [
      data.name,
      data.designation,
      data.email,
      data.phone,
      data.doj,
      data.rno,
      data.salary,
      data.empcode,
    ],
    (err, rows, fields) => {
      if (!err) res.send(`${rows} Data Sent Successfully`);
      else console.log(err);
    }
  );
});

// Update employee by Employee Code.
app.put("/api/v1/employees/:id", (req, res) => {
  const id = req.params.id;
  const data = {
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    doj: req.body.doj,
    rno: req.body.rno,
    salary: req.body.salary,
    empcode: req.body.empcode,
  };
  mysqlConnection.query(
    `UPDATE employee SET name=?,designation=?,email=?,phone=?,doj=?,salary=?,empcode=? WHERE empcode=${id}`,
    [
      data.name,
      data.designation,
      data.email,
      data.phone,
      data.doj,
      data.salary,
      id,
    ],
    (err, results, fields) => {
      if (!err) res.send(JSON.stringify(results));
      else console.log(err);
    }
  );
});

app.listen(4000, () => console.log("App is running at PORT 4000"));
