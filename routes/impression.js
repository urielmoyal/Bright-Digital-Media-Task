const express = require("express");
const impressionController = require("../controllers/impression");
const parseRequest = require("../middlewares/urlParser");
const router = express.Router();

router.use(parseRequest);

router.get("/", impressionController.getPayout);

module.exports = router;
