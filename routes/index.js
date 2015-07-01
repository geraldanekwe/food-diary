var express = require('express'),
  fs = require("fs");
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index');
});

var data = require("../data.json");

router.get('/data/:id', function(req, res) {
  res.send(data.quotes[+req.params.id - 1]);
});

router.get('/quotes', function(req, res) {
  res.json(data);
});

router.delete("/quotes/:id", function(req, res) {
  var spliced = data.quotes.splice(req.params.id, 1);
  if (spliced.length === 0) {
    res.status(404).json({
      error: 'quote not found'
    });
    return;
  }
  persistData({
    success: function() {
      res.json({
        message: "quote deleted",
        deletedIndex: req.params.id
      });
    },
    error: function() {
      res.status(400).json({
        message: "quote was not deleted"
      });
    }
  });
});

var persistData = function(callbacks) {
  fs.writeFile("data.json", JSON.stringify(data), function(err) {
    if (err) {
      console.error(err);
      callbacks.error();
    }
    callbacks.success();
  });
}

router.post('/quotes', function(req, res) {
  var newQuote = req.body.quote;
  if (!newQuote) {
    res.status(400).json({
      error: "We need a text for that quote, son"
    });
    return;
  }
  if (data.quotes.indexOf(newQuote) > -1) {
    res.status(400).json({
      error: "Say something new!"
    });
    return;
  }
  data.quotes.push(newQuote);
  persistData({
    success: function() {
      res.json({
        quote: newQuote
      });
    },
    error: function() {
      res.status(500).json({
        error: "We could not save the quote, please try again later"
      });
    }
  });
});

module.exports = router;
