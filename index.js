const express = require("express");
const app = express();

const model = require("./model/model.js");
const path = require("path");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// show all the chats
app.get("/", async (req, res) => {
  let chats = await model.find();
  res.render("index", { chats });
});

// create new chat
app.get("/userform", (req, res) => {
  res.render("create_form");
});

app.post("/create", async (req, res) => {
  let { username, message } = req.body;
  let date = new Date();
  await model.create({
    username,
    message,
    date,
  });
  res.redirect("/");
});

app.get("/update/:id", async (req, res) => {
  let { id } = req.params;
  let userData = await model.find({ _id: id });
  res.render("updateForm", { user: userData });
});

app.get("/delete/:id", async (req, res) => {
  let { id } = req.params;
  await model.findByIdAndDelete({ _id: id });
  res.redirect("/");
});

app.post("/updateMsg/:id", async (req, res) => {
  let { id } = req.params;
  let { username, message } = req.body;
  await model.findByIdAndUpdate(id, { username, message }, { new: true });
  res.redirect("/");
});

app.listen(5000);
