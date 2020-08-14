# homeflix

![GitHub](https://img.shields.io/github/license/federico-dondi/homeflix)
![GitHub package.json version](https://img.shields.io/github/package-json/v/federico-dondi/homeflix)

Self-hosted streaming service (Netflix-like), over LAN. Written in Node.JS, with Vue and Vuetify for the client-side. Informations provived by [TMDB](https://www.themoviedb.org).

### Setup:

Place all movies in a specific folder, checking that the filenames are of the form {TMDB-identifier}.{extension} (eg. _272.mp4_ as "Batman Begins", _155.mp4_ as "The Dark Knight", etc). Then, create a `.env` file in the project's root directory. This file will contain all application configuration variables, like:

- `NODE_ENV`
- `PORT`
- `MOVIES_PATH`: directory where the application reads and loads movie files
- `TVS_PATH`: directory where the application reads and loads the TV series files (coming soon)

Here's an example:

```
NODE_ENV="development"
PORT=80

MOVIES_PATH="/Users/username/Movies/homeflix/movies/"
...
```
