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

// not working
//make a query search based on the name
// app.get("/vegetables", async (req, res) => {
//   const name = req.query.name;
//   // i makes the search not being case sensitive
//   const vegetables = await Veggie.find(name, "i");
//   console.log(vegetables);
//   res.json(vegetables);
// });

//not working
// app.get('/vegetables', async (req, res) => {
//   const queryString = req.query.name
//   const queryRegex = new RegExp(queryString, 'i')
//   //  i makes it search not being case sensitive
//   const name = await Veggie.find({ 'name': queryRegex })
//   if (name) {
//     //if .find is succesful
//     console.log('Found : ' + name)
//     res.json(name);
//   } else {
//     console.log('Error ' + err)
//     res.status(404).json({ message: 'Cannot find this vegetable', err: err })
//   }
// })

//searchpoint for name+carbonprints
// app.get("/carbonprints", async (req, res) => {
//   const carbonPrint = await Veggie.filter("carbonprint");
//   console.log(carbonPrint);
//   res.json(carbonPrint);
// });

// app.get('/footprints', async (req, res) => {
//   const footPrint = await CarbonFootPrint.find().populate('name')
//   res.json(footPrint)
// })

//var today = new Date();
//const mm = today.getMonth() + 1; //January is 0!
//query depending on name+carbonprint
// app.get("/season", async (req, res) => {
//   const season = await Veggie.find();
//   console.log(season);
//   res.json(season);
// });

app.get("/:name", (req, res) => {
  Veggie.findOne({ name: req.params.name }).then(veggie => {
    if (veggie) {
      res.json(veggie);
    } else {
      res.status(404).json({ error: "Not Found" });
    }
  });
});

//skicka med...id or name
//req.params from veggies db

// app.get("/recipes", (req, res) => {
//   // const query = name
//   const url = `https://api.spoonacular.com/recipes/complexSearch?query=beet&diet=vegetarian,vegan&excludeIngredients=meat, chicken, fish&type=main course&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sortDirection=asc&number=5&apiKey=05cadf6ac7ab4f7689fadae6f24214f3`;
//   // const url = `https://api.spoonacular.com/recipes/complexSearch?query=${req.body.query}&diet=vegetarian, vegan&excludeIngredients=meat, chicken, fish&type=main course&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sortDirection=asc&number=5&apiKey=05cadf6ac7ab4f7689fadae6f24214f3`
//   const getData = async () => {
//     try {
//       const response = await axios.get(url);
//       if (response) {
//         const data = response.data.results;
//         console.log(data);
//         res.json(data);
//       } else {
//         res.send("uh oh...nothing here");
//       }
//     } catch (error) {
//       res.send("wrong", error);
//     }
//   };
//   getData();
// });

app.get("/recipes/:query", async (req, res) => {
  const { query } = req.params;
  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&diet=vegetarian,vegan&excludeIngredients=meat,chicken,fish&type=maincourse&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sortDirection=asc&number=5&apiKey=f1d974d080554ba9b3d5684d8f181411`;
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
