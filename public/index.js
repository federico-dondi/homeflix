new Vue({ 
  router,
  store,
  vuetify,
  created () {
    this.$store.dispatch('getMovies')
  },
}).$mount('#app')