Vue.component('upload-movie-section', {
  template:
  `
  <div>
    <v-btn @click="show = !show" outlined color="primary" class="mt-3">
      <v-icon left>mdi-plus</v-icon> Add new Movie
    </v-btn>

    <v-expand-transition>
      <div v-show="show" class="mt-3">
        <h4>🎬 Populate your library with new, fresh movies.</h4>
        <h4 class="font-weight-regular">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, voluptatibus totam quibusdam autem sint odio sit, esse quod magnam placeat provident quia, corporis aliquid aspernatur illo deserunt. Nisi, nostrum rerum?</h4> 

        <v-file-input @change="upload" 
          accept="
            .mpe,
            .mpeg,
            .mpg,
            .mp4,
            .mov,
            .asf,
            .asr,
            .asx,
            .avi,
            .flv,
            .mka,
            .mkv,
            .mk3d
          "
          show-size 
          label="Movie" 
          persistent-hint 
          hint="Filenames should be in the form of {TMBD-identifier}.{extension}">
        </v-file-input>
      </div>
    </v-expand-transition>
  </div>
  `,
  data () {
    return {
      show: false
    }
  },
  methods: {
    upload (file) {
      if (file) {
        const body = new FormData()

        body.append('nonce', 0)
        body.append('movie', file)

        fetch('http://localhost/movies', {
          body,
          method: 'POST',
        })
          .then((res) => res.json())
          .then((res) => {

          })
      }
    }
  }
})