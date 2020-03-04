// import express from 'express'
// import bodyParser from 'body-parser'
// import cors from 'cors'
// import mongoose from 'mongoose'

//import dotenv from 'dotenv'
//import axios from 'axios'


//dotenv.config()

// const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/foodAPI"
// mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
// mongoose.Promise = Promise

// Defines the port the app will run on.Defaults to 8080, but can be
// overridden when starting the server.For example:

// PORT = 9000 npm start
// const port = process.env.PORT || 8080
// const app = express()

// // Add middlewares to enable cors and json body parsing
// app.use(cors())
// app.use(bodyParser.json())

//key = (process.env.API_Key_A)

// Start defining your routes here
// app.get('/', (req, res) => {
//     res.send('Hello world')
// })


// // vegetable = 'fennel, onion'
// //need some kind of key that will be inserted from front end in the query field depending on the frontend button
// // const requestUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${`vegetable`}&diet=vegetarian, vegan&excludeIngredients=meat, chicken, fish&type=main course&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sortDirection=asc&number=apiKey=${key}`

//const requestUrl = `https://api.spoonacular.com/recipes/complexSearch?query=fennel, onion&diet=vegetarian, vegan&excludeIngredients=meat, chicken, fish&type=main course&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sortDirection=asc&number=20&apiKey=`




////////////This one works and gives back objects////////////////
// const axios = require('axios')

// const getAPI = async () => {
//     try {
//         return await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=fennel, onion&diet=vegetarian, vegan&excludeIngredients=meat, chicken, fish&type=main course&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sortDirection=asc&number=20&apiKey=`
//         )
//     } catch (error) {
//         console.error(error)
//     }
// }

// const allApi = async () => {
//     const recipes = await getAPI()

//     if (recipes.data.results) {
//         // console.log(data.results);
//         //console.log(url);
//         console.log(`Got ${Object.entries(recipes.data.results)} recepies`)

//     }
// }
// allApi()


/////// This one works and gives an array but not with fully info /////////////////
const axios = require('axios')

const url = `https://api.spoonacular.com/recipes/complexSearch?query=fennel, onion&diet=vegetarian, vegan&excludeIngredients=meat, chicken, fish&type=main course&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sortDirection=asc&number=20&apiKey=`;
//const url = `https://api.spoonacular.com/recipes/complexSearch?query=fennel, onion&diet=vegetarian, vegan&excludeIngredients=meat, chicken, fish&type=main course&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sortDirection=asc&number=20&apiKey=${key}`;

const getData = async url => {
    try {
        const response = await axios.get(url);
        const data = response.data;
        console.log(data);
        console.log(url)
    } catch (error) {
        console.log(error);
    }
};

getData(url);

//////////

////////// This hows us the api adress/////////////////
// const axios = require('axios')
// //viktors kod
// const getDataWithin = () => {
//     const url = `https://api.spoonacular.com/recipes/complexSearch?query=fennel, onion&diet=vegetarian, vegan&excludeIngredients=meat, chicken, fish&type=main course&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sortDirection=asc&number=20&apiKey=`;
//     console.log(url)
//     return axios.get(url).then(response => response.data)

// }
// getDataWithin()


//viktors kod 
// getDataWithin(lat, long, radius) {
//     const url = `${this.baseURL}?radius=${radius}&lat=${lat}&lng=${long}&maxFeatures=${this.maxFeatures}&outputFormat=${this.format}&apiKey=${this.apiKey}`
//     console.log(url)
//     return axios.get(url).then(response => response.data)
//   }







//Start the server
// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`)
// })