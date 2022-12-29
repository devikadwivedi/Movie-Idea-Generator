/**
 * Name: Devika Dwivedi
 * Date: 11/23/2022
 * Section: CSE 154 AC
 * TA: Allison Ho
 * This is a file with a random movie idea generator. It has multiple categories of
 * movies including action, comedy, and romance.
 */

"use strict";

(function() {
  window.addEventListener("load", init);
  const BASE_URL = "http://localhost:8000/";

  /**
   * sets up necessary functionality when page loads
   */
  function init() {
    let generateButton = qs("button");
    generateButton.addEventListener("click", getMovie);
    let allButton = qsa("button")[1];
    allButton.addEventListener("click", getAllMovies);
  }

  /**
   * takes the movie genre and gives the user a randomly generated movie
   */
  function getMovie() {
    let url = BASE_URL + "category/" + qs("input").value;
    fetch(url)
      .then(statusCheck)
      .then(resp => resp.json())
      .then(processData)
      .catch(handleError);
  }

  /**
   * puts the movie on the web page
   * @param {Object} responseData of the JSON excuse given by the API
   */
  function processData(responseData) {
    id("movie").classList.remove("hidden");
    id("all-movies").classList.add("hidden");
    id("name").textContent = "Name: " + responseData.name;
    id("rating").textContent = "Rating: " + responseData.rating;
    id("release-year").textContent = "Release Year: " + responseData.year;
  }

  /**
   * given the movie genre it gives the user a randomly generated movie
   */
  function getAllMovies() {
    let url = BASE_URL + "all";
    fetch(url)
      .then(statusCheck)
      .then(resp => resp.text())
      .then(processAllData)
      .catch(handleError);
  }

  /**
   * Shows user the name for every movie
   * @param {String} responseData contains every movie name
   */
  function processAllData(responseData) {
    id("all-movies").classList.remove("hidden");
    id("movie").classList.add("hidden");
    id("all-movies").innerHTML = "";

    let allMovies = responseData.split(",");

    allMovies.forEach(element => {
      let curr = gen("p");
      curr.textContent = element;
      id("all-movies").appendChild(curr);
    });
  }

  /**
   * gives the user a helpful message if an error occurs while requesting
   * @param {String} responseData error description
   */
  function handleError(responseData) {
    let message = gen("p");
    message.textContent = responseData + ". Please refresh and try again.";
    qs("section").appendChild(message);
    let generateButton = qs("button");
    generateButton.removeEventListener("click", getMovie);
    let allButton = qsa("button")[1];
    allButton.removeEventListener("click", getAllMovies);
  }

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} res - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Returns the desired element node
   * @param {string} tag - the name of the tag to create
   * @returns {object} the desired element node
   */
  function gen(tag) {
    return document.createElement(tag);
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} id - element ID.
   * @returns {object} - DOM object associated with id.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns first element matching the given CSS selector.
   * @param {string} selector - CSS selector.
   * @returns {object} - object associated selector.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns an array of elements that match the given CSS selector.
   *  @param {string} selector - CSS selector
   *  @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }
})();