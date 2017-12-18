export default {
  methods: {
    clearErrors (fieldName) {
      if (!fieldName) return
      this.$store.dispatch(this.action('clearErrorAction'), fieldName)
    }
  }
}
