const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const Foodmodel = require("./models/Food");
const PORT = 3001;
app.use(cors());
app.use(express.json());
require("dotenv").config();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/insert", async (req, res) => {
  const foodName = req.body.foodName;
  const days = req.body.days;
  const food = new Foodmodel({ foodName: foodName, daysSinceIAte: days });
  try {
    await food.save();
    res.send("Inserted data!");
  } catch (err) {
    console.error(err);
  }
});
app.get("/read", (req, res) => {
  Foodmodel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
app.put("/update", async (req, res) => {
  const newFoodName = req.body.newFoodName;
  const id = req.body.id;
  try {
    await Foodmodel.findById(id, (err, updatedFood) => {
      updatedFood.foodName = newFoodName;
      updatedFood.save();
      res.send("updated");
    });
  } catch (err) {
    console.error(err);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await Foodmodel.findByIdAndDelete(id);
  res.send("deleted");
});
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
