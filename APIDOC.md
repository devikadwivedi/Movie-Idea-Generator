# Movie API Documentation
The Movie API provides information about the various popular movies in different
genres.


## Get a list of all movies in this service.
**Request Format:** /all

**Request Type:** GET

**Returned Data Format**: Plain Text

**Description:** Returns a plain text of all movies comma and new-line separated in this service.

**Example Request:** /all

**Example Response:**
```
Bullet Train,
Top Gun: Maverick,
Black Panther: Wakanda Forever,
Spider-Man: Into the Spider-Verse,
Dune,
Minions: The Rise of Gru,
Thor: Love and Thunder,
Encanto,
Knives Out,
Dumb and Dumber,
Daddy Day Care,
The Addams Family,
After: Ever Happy,
Roman Holiday,
Call Me By Your Name,
Titanic,
Romeo + Juliet,
Jaws,
The Shining,
Child's Play,
The Bee Movie,
Get Out,
```
**Error Handling:**
- Possible 500 errors (all plain text):
  - If something goes wrong on the server, returns an error with the message: `something went wrong on the server.`

## Get a random movie given a category
**Request Format:** /category/:type

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Returns a JSON containing data about random movie given movie genre. This includes the movie name, rating on IMDb and release year.

**Example Request:** /category/comedy

**Example Response:**
```json
{
  "name":"Knives Out","rating":"7.9/10","year":"2019"
}
```

**Error Handling:**
- Possible 400 (invalid request) errors (all plain text):
  - If passed in an invalid movie genre, returns an error with the message: `bad param`
- Possible 500 errors (all plain text):
  - If something goes wrong on the server, returns an error with the message: `something went wrong on the server.`