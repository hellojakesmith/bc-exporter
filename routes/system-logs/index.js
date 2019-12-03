const systemLogs = require('./logs')
const logs = new systemLogs()
const express = require('express');
const router = express.Router();

const fastcsv = require('fast-csv');
const fs = require('fs');
const ws = fs.createWriteStream("data.csv");

logs.initClass()
/* GET home page. */
router.get('/', function(req, res, next) {
    fastcsv
    .write(logs.logs, { headers: true })
    .pipe(ws);
  res.json({ 
    data: logs.logs
  })
});

module.exports = router;
