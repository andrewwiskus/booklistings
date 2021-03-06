var express = require('express');
var router = express.Router();
var Book = require('../models/book');

router.get('/', function (req, res) {
  Book.find({}, function (err, books) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.send(books);
  });
});

router.post('/', function (req, res) {
  console.log('POST', req.body);
  var book = Book(req.body);
  book.save(function (err) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.sendStatus(201);
  });
});

router.put('/:id', function (req, res) {
  var book = req.body;
  var id = req.params.id;
  Book.findByIdAndUpdate(id, book, function (err, book) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.status(204).send(book);
  });
});

router.delete('/:id', function (req, res) {
  var id = req.params.id;
  Book.findByIdAndRemove(id, function (err) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.sendStatus(204);
  });
});


router.post('/:id/comments', function (req, res) {
  var id = req.params.id;
  var comment = req.body;

  console.log('New comment data', comment);

  Book.findById(id, function (err, book) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    book.comments.push(comment);
    book.save(function (err) {
      if (err) {
        console.log('Error: ', err);
        res.sendStatus(500);
        return;
      }

      res.sendStatus(204);
    });
  });
});

module.exports = router;
