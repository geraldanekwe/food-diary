var express = require('express'),
  fs = require("fs"),
  Firebase = require('firebase');
var router = express.Router();
var foodArr = [],
  usersArr = [],
  foodListArr = [];

var usersRef = new Firebase("https://historic1.firebaseio.com/users");
var foodRef = new Firebase("https://historic1.firebaseio.com/food");

router.get('/', function(req, res, next) {
  foodRef.once("value", function(snap) {
    foodArr.push(snap.val());
  });
  foodArr.map(function(obj) {
    foodListArr = [];
    for (var key in obj) {
      foodListArr.push(obj[key]);
    }
    console.log(foodListArr);
  });
  // res.JSON(foodListArr);
  res.render('index', {
    food1: foodListArr
  });

});


router.post('/users', function(req, res) {
  usersRef.push(req.body);
  res.send(req.body);
});

router.post('/food/', function(req, res) {
  foodRef.push(req.body);
  foodRef.once("value", function(snap) {
    foodArr.push(snap.val());
    res.send(foodArr);
  });
});

router.delete("/food/:id", function(req, res) {
  foodArr.splice(req.params.id, 1);
  res.json({
    message: 'item deleted',
    deletedIndex: req.params.id
  });
});


// router.get('/quotes', function(req, res) {
//   res.json(data);
// });

// router.delete("/quotes/:id", function(req, res) {
//   var spliced = data.quotes.splice(req.params.id, 1);
//   if (spliced.length === 0) {
//     res.status(404).json({
//       error: 'quote not found'
//     });
//     return;
//   }
//   persistData({
//     success: function() {
//       res.json({
//         message: "quote deleted",
//         deletedIndex: req.params.id
//       });
//     },
//     error: function() {
//       res.status(400).json({
//         message: "quote was not deleted"
//       });
//     }
//   });
// });

// var persistData = function(callbacks) {
//   fs.writeFile("data.json", JSON.stringify(data), function(err) {
//     if (err) {
//       console.error(err);
//       callbacks.error();
//     }
//     callbacks.success();
//   });
// }


// router.post('/quotes', function(req, res) {
//   var newQuote = req.body.quote;
//   if (!newQuote) {
//     res.status(400).json({
//       error: "We need a text for that quote, son"
//     });
//     return;
//   }
//   if (data.quotes.indexOf(newQuote) > -1) {
//     res.status(400).json({
//       error: "Say something new!"
//     });
//     return;
//   }
//   data.quotes.push(newQuote);
//   persistData({
//     success: function() {
//       res.json({
//         quote: newQuote
//       });
//     },
//     error: function() {
//       res.status(500).json({
//         error: "We could not save the quote, please try again later"
//       });
//     }
//   });
// });

module.exports = router;
