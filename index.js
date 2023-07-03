require("dotenv").config();
const connetToDb = require("./database/db");

const express = require("express");
const app = express();
const port = process.env.PORT || 200;
const cors = require("cors");

app.use(express.json());
app.use(cors());
const Pessoa = require("./model/pessoa");

connetToDb();

app.get("/", async(req, res) => {
  const pessoas = await Pessoa.find();
  res.json(pessoas);
});

app.post("/ins", async (req, res) => {
  const {name, age} = req.body;
  const newUser = await Pessoa.create({name, age});

  res.status(201).json(newUser);
});
app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  await Pessoa.findByIdAndUpdate(id, {name, age});

  res.sendStatus(204);
});
app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Pessoa.findByIdAndDelete(id);

  res.sendStatus(204);
});

app.listen(port, () => console.log(`🚀 Meu site http://localhost:${port}`));
