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
// HI THERE

const axios = require("axios");

let url = "https://dog.ceo/api/breeds/list/all";

type returnedObjError = {
  message: String;
  statusCode: Number;
};

type returnedObjSuccess = {
  message: String[];
  status: String;
};

const handleBreeds = async () => {
  try {
    const response = await axios.get(url);
    const breeds = response.data.message;
    const flattenBreeds: String[] = [];
    for (let breed in breeds) {
      const subbreeds: String = breeds[breed].join(" ");
      flattenBreeds.push(`${subbreeds} ${breed}`);
    }
    const returnedObj: returnedObjSuccess = {
      message: flattenBreeds,
      status: "success",
    };
    return returnedObj;
  } catch (error) {
    const returnedObj: returnedObjError = {
      message: "504 Gateaway Timeout",
      statusCode: 504,
    };
    return returnedObj;
  }
};
handleBreeds().then((result) => console.log(result));
module.exports = handleBreeds;
