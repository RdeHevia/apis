const axios = require("axios");
jest.mock("axios");
const calcTotalInUSD = require("./coin_api");

// test default values
// test with given values
// test wrong values

// index.test.js
// const getFirstAlbumTitle = require("./index");
// const axios = require("axios");

// jest.mock("axios");

it("returns the correct total from BTC to USD", async () => {
  axios.get.mockResolvedValue({
    data: {
      time: "2021-10-19T16:28:13.0000000Z",
      asset_id_base: "BTC",
      asset_id_quote: "USD",
      rate: 10,
    },
  });

  const total = await calcTotalInUSD();
  expect(total).toEqual(10);

  //   const title = await getFirstAlbumTitle();
  //   expect(title).toEqual("My First Album");
});
