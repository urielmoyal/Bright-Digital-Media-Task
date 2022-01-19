const URL = require("url");

module.exports = (req, res, next) => {
  //middleware that parse the url patams and add that fixed param to the req object

  let url_parts = URL.parse(req.url, true);
  const { campaignid, clickid, url } = url_parts.query;

  //extract the host from the url query params
  let domain = URL.parse(url_parts.query.url, true).host;

  req.campaignId = campaignid;
  req.clickId = clickid;
  req.clientUrl = url;
  req.domain = domain;

  next();
};
