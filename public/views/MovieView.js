const MovieView = Vue.component('movie-view', {
  template:
  `
  <div>
    <v-row>
      <v-col cols="2">
        <v-hover>
          <template v-slot="{ hover }">
              <v-img
              :class="(hover) ? 'elevation-24' : 'elevation-6'" 
              class="rounded-lg transition-swing" 
              :src="(poster_path) ? 'https://image.tmdb.org/t/p/w342' + poster_path : ''">
              </v-img>
          </template>
        </v-hover>

        <movie-card-rating :value="vote_average"></movie-card-rating>
      </v-col>
      <v-col cols="10">
        <h1>{{ title }}</h1>

        <p class="body-2">
          <span>
            <v-icon small>mdi-calendar-blank-outline</v-icon> {{ release_date }}
          </span> • 
          <span>
            <v-icon small>mdi-drama-masks</v-icon> {{ genres }}
          </span> • 
          <span>
            <v-icon small>mdi-clock-outline</v-icon> {{ runtime }} minutes
          </span>
        </p>

        <p>{{ overview }}</p>

        <v-btn @click="play" outlined color="primary">
          <v-icon left>mdi-play</v-icon> Play the Movie
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <video autoplay controls style="display: none;"></video>
      </v-col>
    </v-row>
  </div>
  `,
  data() {
    return {
      id: 0,

      title: undefined,
      overview: undefined,
      genres: undefined,
      runtime: undefined,
      vote_average: undefined,
      release_date: undefined,

      poster_path: undefined
    }
  },
  created() {
    const movie = this.getMovie((this.id = this.$route.params.id))

    this.title = movie.title
    this.overview = movie.overview
    this.genres = movie.genres.map(v => v.name).join(', ')
    this.runtime = movie.runtime
    this.vote_average = movie.vote_average * 10
    this.release_date = movie.release_date

    this.poster_path = movie.poster_path
  },
  methods: {
    play() {
      fetch(`/movies/${this.id}`)
        .then((res) => res.json())
        .then((res) => {
          const videoHTMLElement = document.getElementsByTagName('video')[0]

          videoHTMLElement.src = `/movies/${res.data.id}/stream`
          videoHTMLElement.type = res.data.type
          videoHTMLElement.style = ''

          videoHTMLElement.play()
        })
    }
  },
  computed: {
    ...Vuex.mapGetters(['getMovie'])
  }
})