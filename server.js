import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import axios from "axios";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/food";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const Veggie = mongoose.model("Veggie", {
  id: Number,
  name: String,
  month: [String], // not sure if this is the correct way to display the months?
  carbonprint: Number
});

// const CarbonFootPrint = mongoose.model('CarbonFootPrint', {
//   carbonprint: Number,
//   //this name will be related to the above Name through the ObjectId
//   name: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Name'
//   }
// })

if (process.env.RESET_DATABASE) {
  console.log("Resetting database");

  const seedDatabase = async () => {
    // this wait makes it that everytime seedDatabase is run it starts with empty the array.
    await Veggie.deleteMany();
    // await CarbonFootPrint.deleteMany();

    // carbon footprint based on 1kg

    await new Veggie({
      id: "Broccoli",
      name: "Broccoli",
      month: ["Jun", "Jul", "Aug"],
      carbonprint: 0.56
    }).save(); //
    await new Veggie({
      id: "Cauliflower",
      name: "Cauliflower",
      month: ["May", "Jun", "Jul", "Aug"],
      carbonprint: 0.43
    }).save(); //
    await new Veggie({
      id: "Pepper",
      name: "Pepper",
      month: ["Jul", "Aug"],
      carbonprint: 0.64
    }).save(); //
    await new Veggie({
      id: "Cabbage",
      name: "Cabbage",
      month: ["Jul", "Aug"],
      carbonprint: 0.4
    }).save(); //
    await new Veggie({
      id: "Mushrooms",
      name: "Mushrooms",
      month: ["Jul", "Aug"], //
      carbonprint: 1.31
    }).save();
    await new Veggie({
      id: "Eggplant",
      name: "Eggplant",
      month: ["Aug"],
      carbonprint: 0.29
    }).save(); //
    await new Veggie({
      id: "Potato",
      name: "Potato",
      month: ["May", "Jun", "Jul", "Aug"],
      carbonprint: 0.4
    }).save(); //
    await new Veggie({
      id: "Cucumber",
      name: "Cucumber",
      month: ["Jul", "Aug"],
      carbonprint: 0.45
    }).save(); //
    await new Veggie({
      id: 11124,
      name: "Carrot",
      month: ["May", "Jun", "Jul", "Aug"],
      carbonprint: 0.27
    }).save(); //
    await new Veggie({
      id: "Pumpkin",
      name: "Pumpkin",
      month: ["Aug"],
      carbonprint: 0.21
    }).save(); //
    await new Veggie({
      id: 11080,
      name: "Beets",
      month: ["May", "Jun", "Jul", "Aug"],
      carbonprint: 0.32
    }).save(); //
    await new Veggie({
      id: "Asparagus",
      name: "Asparagus",
      month: ["may", "jun"],
      carbonprint: 0.58
    }).save(); //
    await new Veggie({
      id: "Spinach",
      name: "Spinach",
      month: ["May", "Jun", "Jul", "Aug"],
      carbonprint: 0.29
    }).save(); //
    await new Veggie({
      id: 11529,
      name: "Tomato",
      month: ["Jun", "Jul", "Aug"],
      carbonprint: 0.77
    }).save(); //
  };
  seedDatabase();
}
// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello Hello");
});

//only gives an empty array
app.get("/veggies", async (req, res) => {
  const allVeggies = await Veggie.find();
  res.json(allVeggies);
});

app.get("/:name", (req, res) => {
  Veggie.findOne({ name: req.params.name }).then(veggie => {
    if (veggie) {
      res.json(veggie);
    } else {
      res.status(404).json({ error: "Not Found" });
    }
  });
});

app.get("/recipes/:query", async (req, res) => {
  const { query } = req.params;
  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&diet=vegetarian,vegan&excludeIngredients=meat,chicken,fish&type=maincourse&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sortDirection=asc&number=5&apiKey=e99f7d4ea0af48abb5d111748867fa6b`;
  try {
    const response = await axios.get(url);
    if (response) {
      const data = response.data.results;
      console.log(data);
      res.json(data);
    } else {
      res.send("uh oh...nothing here");
    }
  } catch (error) {
    res.send("wrong", error);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
