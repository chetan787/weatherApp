var express = require('express');
var router = express.Router();

const ct=require('../controller/weatherController')
const bodyParser = require('body-parser');
router.use(bodyParser.json());


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('components/weather', { title: 'Express' });
});

router.post('/submit',ct.getWeather )

module.exports = router;
