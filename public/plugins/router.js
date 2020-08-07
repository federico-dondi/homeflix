const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'All Movies',
      component: MoviesCatalogue
    },
    {
      path: '/movies/:id',
      name: 'View Movie',
      component: MovieView
    }
  ]
})