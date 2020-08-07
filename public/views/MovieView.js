const MovieView = Vue.component('movie-view', {
  template:
  `
  <video ref="videoPlayer" controls>
    <source ref="videoSource">
  </video>
  `,
  mounted() {
    const id = this.$route.params.id

    fetch(`/movies/${id}`)
      .then((res) => res.json())
      .then((res) => {
        this.$refs.videoSource.src = `/movies/${res.data.id}/stream`
        this.$refs.videoSource.type = res.data.type

        this.$refs.videoPlayer.play()
      })
  }
})