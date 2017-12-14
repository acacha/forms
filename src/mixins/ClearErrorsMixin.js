export default {
  methods: {
    clearErrors (fieldName) {
      if (!fieldName) return
      this.$store.dispatch('acacha-forms/clearErrorAction', fieldName)
    }
  }
}
