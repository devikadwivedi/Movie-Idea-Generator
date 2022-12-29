/**
 * Name: Devika Dwivedi
 * Date: 11/23/2022
 * Section: CSE 154 AC
 * TA: Allison Ho
 * This is a file that handles two get requests about movies.
 */
'use strict';

const express = require('express');
const app = express();
const fs = require('fs').promises;

/**
 * returns a list of every movie in the database
 */
app.get("/all", async function(req, res) {
  try {
    let fullFile = await fs.readFile('all-movies.txt', 'utf8');
    res.type("text").send(fullFile);
  } catch (err) {
    res.type('text');
    if (err.code === 'ENOENT') {
      res.status(500).send('something went wrong on the server');
    }
  }
});

/**
 * returns a random movie and its data given the specfied genre
 */
app.get("/category/:type", async function(req, res) {
  let type = req.params.type;
  let arr = ["family", "comedy", "action", "horror", "romance"];
  let found = false;

  for (let i = 0; i < arr.length; i++) {
    if (type === arr[i]) {
      found = true;
      try {
        let fullFile = await fs.readFile('movies.json', 'utf8');
        let randomNum = Math.floor(Math.random() * 5);
        let parsedContent = JSON.parse(fullFile);
        res.type("json").send(getJson(type, parsedContent)[randomNum]);
      } catch (err) {
        if (err.code === 'ENOENT') {
          res.status(500).send('something went wrong on the server');
        }
      }
    }
  }
  if (!found) {
    res.status(400);
    res.type("text");
    res.send("bad param");
  }
});

/**
 * provides the movie details
 * @param {String} type of movie requested
 * @param {Object} parsedContent movie database for all genres
 * @returns {Object} movie database for the specified genre
 */
function getJson(type, parsedContent) {
  let result;
  if (type === "family") {
    result = parsedContent.family;
  } else if (type === "comedy") {
    result = parsedContent.comedy;
  } else if (type === "romance") {
    result = parsedContent.romance;
  } else if (type === "action") {
    result = parsedContent.action;
  } else if (type === "horror") {
    result = parsedContent.horror;
  }
  return result;
}

app.use(express.static("public"));
const PORT = process.env.PORT || 8000;
app.listen(PORT);
