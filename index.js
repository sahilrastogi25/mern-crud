const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const Foodmodel = require("./models/Food");
const PORT = 3001;
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://sahil:test1234@crud.ylkhg.mongodb.net/food?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.post("/insert", async (req, res) => {
  const foodName = req.body.foodName;
  const days = req.body.days;
  const food = new Foodmodel({ foodName: foodName, daysSinceIAte: days });
  try {
    await food.save();
    console.log("Added data");
    res.send("Inserted data!");
  } catch (err) {
    console.error(err);
  }
});
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
