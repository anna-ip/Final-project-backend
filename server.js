import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'


const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/food"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise


const Veggie = mongoose.model('Veggie', {
  name: String,
  month: [Number], // not sure if this is the correct way to display the months?
  carbonprint: Number
})

if (process.env.RESET_DATABASE) {
  console.log('Resetting database')

  const seedDatabase = async () => {
    // this wait makes it that everytime seedDatabase is run it starts with empty the array.
    await Veggie.deleteMany()


    await new Veggie({ name: "Broccoli", month: [6, 7, 8], carbonprint: 0.56 }).save()
    await new Veggie({ name: "Cauliflower", month: [5, 6, 7, 8], carbonprint: 0.43 }).save()
    await new Veggie({ name: "Pepper", month: [7, 8], carbonprint: 0.64 }).save()
    await new Veggie({ name: "Cabbage", month: [7, 8], carbonprint: 0.40 }).save()
    await new Veggie({ name: "Mushrooms", month: [7, 8], carbonprint: 1.31 }).save()
    await new Veggie({ name: "Aubergine", month: [8], carbonprint: 0.29 }).save()
    await new Veggie({ name: "Fennel", month: [7, 8], carbonprint: 0.24 }).save()
    await new Veggie({ name: "Potato", month: [5, 6, 7, 8], carbonprint: 0.40 }).save()
    await new Veggie({ name: "Cucumber", month: [7, 8], carbonprint: 0.45 }).save()
    await new Veggie({ name: "Carrot", month: [5, 6, 7, 8], carbonprint: 0.27 }).save()
    await new Veggie({ name: "Pumpkin", month: [8], carbonprint: 0.21 }).save()
    await new Veggie({ name: "Beetroot", month: [5, 6, 7, 8], carbonprint: 0.32 }).save()
    await new Veggie({ name: "Asparagus", month: [5, 6], carbonprint: 0.58 }).save()
    await new Veggie({ name: "Spinach", month: [5, 6, 7, 8], carbonprint: 0.29 }).save()
    await new Veggie({ name: "Zucchini", month: [5, 6, 7, 8], carbonprint: 0.25 }).save()
    await new Veggie({ name: "Tomato", month: [6, 7, 8], carbonprint: 0.77 }).save()
    await new Veggie({ name: "Yellow Onion", month: [5, 6, 7, 8], carbonprint: 0.25 }).save()

  }
  seedDatabase()
}
// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
// app.get('/', (req, res) => {
//   res.send('Hello world')
// })

//only gives an empty array
app.get('/veggies', async (req, res) => {
  const allVeggies = await Veggie.find()
  res.json(allVeggies)
})

//make a query search based on the name
app.get('/vegetables', async (req, res) => {
  const vegetable = req.query.name
  const veggies = await Veggie.find(vegetable)
  console.log(veggies)
  res.json(veggies)
})

//searchpoint for name+carbonprints
app.get('/carbonprints', async (req, res) => {
  const carbonPrint = await Veggie.find('carbonprint')
  console.log(carbonPrint)
  res.json(carbonPrint)
})


//var today = new Date();
//const mm = today.getMonth() + 1; //January is 0!
//query depending on name+carbonprint
app.get('/season', async (req, res) => {
  const season = await Veggie.find()
  console.log(season)
  res.json(season)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
