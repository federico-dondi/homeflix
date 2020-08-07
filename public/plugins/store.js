const store = new Vuex.Store({
  state: {
    version: '1.0.0',
    movies: [

    ]
  },
  mutations: {
    ENQUEUE_MOVIE(state, movie) {
      state.movies.push(movie)
    }
  },
  actions: {
    async getMovies({ commit, state }) {
      fetch('/movies')
        .then((res) => res.json())
        .then((res) => {
          Object.keys(res.data).forEach((id) => {

            fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=36f46f870f756f0fb55d4fabd2c83213`)
              .then((movie) => movie.json())
              .then((movie) => {
                commit('ENQUEUE_MOVIE', movie)
              })
          })
        })
    }
  },
  getters: {
    getMovie: (state) => (id) => {
      return state.movies.find(movie => movie.id === id)
    }
  }
})