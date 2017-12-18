export default {
  computed: {
    form () {
      return this.$store.getters[this.formName + '/form']
    }
  },
  methods: {
    action (name) {
      return this.formName + '/' + name
    },
    updateForm (fields) {
      this.$store.dispatch(this.action('updateFormAction'), fields)
    },
    send (action, uri) {
      return this.$store.dispatch(this.action(action), uri)
    },
    post (uri) {
      return this.send('post', uri)
    },
    put (uri) {
      return this.send('put', uri)
    },
    patch (uri) {
      return this.send('patch', uri)
    },
    delete (uri) {
      return this.send('delete', uri)
    }
  }
}
