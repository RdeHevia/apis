/*
create a function handleBreeds
url:  https://dog.ceo/api/breeds/list/all

responses:
    - 200. response body: {
        message: [//.. flatten all breed in here]
        status: "success"
    }
    -504 if timeout. response body: {
      message: "504 Gateaway Timeout",
      statusCode: 504     
    } 
*/

const axios = require("axios");

const url = "https://dog.ceo/api/breeds/list/all";

const handleBreeds = async () => {
  try {
    const response = await axios.get(url);
    const breeds = response.data.message;
    const flattenBreeds = [];
    for (let breed in breeds) {
      const subbreeds = breeds[breed].join(" ");
      flattenBreeds.push(`${subbreeds} ${breed}`);
    }
    const returnedObj = {
      message: flattenBreeds,
      status: "success",
    };
    return returnedObj;
  } catch (error) {
    const returnedObj = {
      message: "504 Gateaway Timeout",
      statusCode: 504,
    };
    return returnedObj;
  }
};
handleBreeds().then((result) => console.log(result));
module.exports = handleBreeds;
