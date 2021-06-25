const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Foodmodel = require("./models/Food");
const PORT = 3001;
app.use(express.json());

mongoose.connect(
  "mongodb+srv://sahil:test1234@crud.ylkhg.mongodb.net/food?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.get("/", (req, res) => {
  const food = new Foodmodel({ foodName: "Papaya", daysSinceIAte: 10 });
  try {
    food.save();
    res.send("Inserted data!");
  } catch (err) {
    console.error(err);
  }
});
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
