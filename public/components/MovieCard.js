Vue.component('movie-card', {
  template:
  `
  <div @click="open">
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

    <h1 class="body-2 text--primary font-weight-bold">{{ title }}</h1>
    <h2 class="body-2 text--secondary">{{ release_date }}</h2>
  </div>
  `,
  props: { id: Number },
  data() {
    return {
      title: undefined,
      vote_average: undefined,
      release_date: undefined,

      poster_path: undefined
    }
  },
  created() {
    const movie = this.getMovie(this.id)

    this.title = movie.title
    this.vote_average = movie.vote_average * 10
    this.release_date = movie.release_date

    this.poster_path = movie.poster_path
  },
  mounted() {

  },
  methods: {
    open () {
      this.$router.push({ name: 'View Movie', params: { id: this.id }});
    }
  },
  computed: {
    ...Vuex.mapGetters(['getMovie'])
  }
})