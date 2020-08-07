Vue.component('movie-card-rating', {
  template:
  `
  <v-progress-circular class="rating-badge"
    :value="value"
    :rotate="-90"
    :size="42"
    :width="3"
    :color="getColor()"
  >
    <span class="white--text rating-badge-vote font-weight-medium">{{ value }}</span> 
    <span class="white--text rating-badge-percentage"> %</span> 
  </v-progress-circular>
  `,
  props: { value: Number },
  methods: {
    getColor() {
      if (this.rating < 50) return 'error'
      if (this.rating < 70) return 'warning'

      return 'success'
    }
  }
})