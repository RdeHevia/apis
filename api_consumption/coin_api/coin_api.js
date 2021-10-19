const axios = require("axios");

const [symbol, amount] = process.argv.slice(2);
function calcTotalInUSD(symbol = "BTC", amount = 1) {
  const config = {
    headers: { "X-CoinAPI-Key": "51B5BE99-0D5B-43B1-8280-6A1783DFA7ED" },
  };

  return axios
    .get(`https://rest.coinapi.io/v1/exchangerate/${symbol}/USD`, config)
    .then((response) => {
      const rate = response.data.rate;
      return Math.round(rate * amount);
    })
    .catch((err) => console.log(err.response.status));
}

calcTotalInUSD(symbol, amount).then((total) => console.log(total));

module.exports = calcTotalInUSD;
