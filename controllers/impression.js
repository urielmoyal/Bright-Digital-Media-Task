const url = require("url");
const utils = require("../utils/utils");
const httpError = require("../models/http-error");

// utils.getRequest return a Promise
const getPayout = (req, res, next) => {
  let highestBid = { payout: 0, url: "" };
  const baseUrl = `https://e311dw00w9.execute-api.us-east-1.amazonaws.com/production/auction?${req.campaignId}&${req.clickId}&${req.clientUrl}&${req.domain}`;
  const promisesArray = [
    utils.getRequest(baseUrl),
    utils.getRequest(baseUrl),
    utils.getRequest(baseUrl),
    utils.getRequest(baseUrl),
  ];
  const threshold = 250;

  //utils.raceAll combine Promise.race and Promise.all
  utils
    .raceAll(promisesArray, threshold, null)
    .then((results) => {
      // process results here
      // any timed out values will be null
      let final = results.filter((item) => !!item);
      if (final.length === 0) {
        return next(new httpError("Request Timeout", 408));
      }
      final.map((bid) => {
        console.log(bid.data);
        if (bid.data.payout > highestBid.payout) {
          highestBid = bid.data;
        }
      });

      //if all the bids are empty or http error then pass 204 no content http error
      if (!highestBid.url) {
        return next(new httpError("No content", 204));
      }

      res.redirect(highestBid.url);
    })
    .catch((err) => {
      return next(new httpError("some server Error", 500));
    });
};

exports.getPayout = getPayout;
