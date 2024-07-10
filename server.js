const express = require("express");
const app = express();

app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.send("Привет, Redev!");
});

app.post("/api/echo", (req, res) => {
  res.send(req.body.message);
});

let users = [];

// create
app.post("/api/users", (req, res) => {
  let user = {};
  user.id = req.body.id;
  user.username = req.body.username;
  user.email = req.body.email;
  user.password = req.body.password;
  users.push(user);
  res.send(`Новый пользователь создан. Кол-во пользователей ${users.length}`);
});

// read
app.get("/api/users", (req, res) => {
  res.send(JSON.stringify(users));
});

app.get("/api/users/:id", (req, res) => {
  let user = users.filter((val) => val.id === Number(req.params.id));
  if (user.length === 0) {
    res.send('Пользователь с указанным id не найден');
  } else {
    res.send(JSON.stringify(user[0]));
  }
});

// update
app.put("/api/users/:id", (req, res) => {
  let userIndex = users.indexOf(
    users.filter((val) => val.id === Number(req.params.id))[0]
  );
  if (userIndex < 0) {
    res.send("Пользователь с указанным id не найден");
  } else {
    users[userIndex].username = req.body.username;
    users[userIndex].email = req.body.email;
    users[userIndex].password = req.body.password;
    res.send(JSON.stringify(users));
  }
});

app.patch("/api/users/:id", (req, res) => {
  let userIndex = users.indexOf(
    users.filter((val) => val.id === Number(req.params.id))[0]
  );
  if (userIndex < 0) {
    res.send("Пользователь с указанным id не найден");
  } else {
    users[userIndex].password = req.body.password;
    res.send(JSON.stringify(users));
  }
});

// delete
app.delete("/api/users/:id", (req, res) => {
  let userIndex = users.indexOf(
    users.filter((val) => val.id === Number(req.params.id))[0]
  );
  if (userIndex < 0) {
    res.send("Пользователь с указанным id не найден");
  } else {
    users.splice(userIndex, 1);
    res.send(JSON.stringify(users));
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
