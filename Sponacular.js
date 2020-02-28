// // import express from 'express'
// // import bodyParser from 'body-parser'
// // import cors from 'cors'
// // import mongoose from 'mongoose'
// const axios = require('axios');

// // import dotenv from 'dotenv'
// // // import axios from 'axios'


// // dotenv.config()



// // key = (process.env.API_Key_A)
// // vegetable = 'fennel, onion'
// //need some kind of key that will be inserted from front end in the query field depending on the frontend button
// // const requestUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${`vegetable`}&diet=vegetarian, vegan&excludeIngredients=meat, chicken, fish&type=main course&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sortDirection=asc&number=apiKey=${key}`

// // const requestUrl = `https://api.spoonacular.com/recipes/complexSearch?query=fennel,onion&diet=vegetarian,vegan&excludeIngredients=meat,chicken,fish&type=maincourse&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sortDirection=asc&number=apiKey=${key}`

// axios({
//     url: 'https://api.spoonacular.com/recipes/complexSearch?query=fennel,onion&diet=vegetarian,vegan&excludeIngredients=meat,chicken,fish&type=maincourse&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sortDirection=asc&number=apiKey=${key}'
//     ,
//     method: 'get',
//     data: {
//         foo: 'bar'
//     }
// })


// // Make a request for a user with a given ID
// axios.get(url + '/url')
//     .then(function (response) {
//         // handle success
//         console.log(response.data)
//         console.log(response.status)
//     })
//     .catch(function (error) {
//         // handle error
//         console.log(error);
//     })
//     .finally(function () {
//         // always executed
//     });

// const axios = require('axios')

// const getAPI = async () => {
//     try {
//         return await axios.get('https://api.spoonacular.com/recipes/complexSearch?query=fennel,onion&diet=vegetarian,vegan&excludeIngredients=meat,chicken,fish&type=maincourse&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sortDirection=asc&number=apiKey=${key}'
//         )
//     } catch (error) {
//         console.error(error)
//     }
// }

// const allApi = async () => {
//     const recipes = await getAPI()

//     if (recipes.data.results) {
//         console.log(`Got ${Object.entries(recipes.data.results).length} recepies`)
//     }
// }

// allApi()


const axios = require("axios");
const url = "https://api.spoonacular.com/recipes/complexSearch?query=fennel,onion&diet=vegetarian,vegan&excludeIngredients=meat,chicken,fish&type=maincourse&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&sortDirection=asc&number=apiKey=${key}";

const getData = async url => {
    try {
        const response = await axios.get(url);
        const data = response.data;
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

getData(url);