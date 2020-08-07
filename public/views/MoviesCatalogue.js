const MoviesCatalogue = Vue.component('movie-catalogue', {
  template:
  `
  <v-row>
    <v-col cols="2" v-for="m in movies" :key="m.id">
      <movie-card :id="m.id"></movie-card>
    </v-col>
  </v-row>
  `,
  computed: {
    ...Vuex.mapState(['movies'])
  }
})

