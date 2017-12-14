export default {
  data: function () {
    return {
      validation: true,
      strictValidation: true
    }
  },
  methods: {
    toogleValidation () {
      this.validation = !this.validation
      this.strictValidation = this.validation
      this.updateValidation()
      this.updateStrictValidation()
    },
    updateValidation () {
      if (this.validation) this.$store.dispatch('acacha-forms/enableValidationAction')
      else this.$store.dispatch('acacha-forms/disableValidationAction')
    },
    updateStrictValidation () {
      if (this.strictValidation) this.$store.dispatch('acacha-forms/enableStrictValidationAction')
      else this.$store.dispatch('acacha-forms/disableStrictValidationAction')
    },
    toogleStrictValidation () {
      this.strictValidation = !this.strictValidation
      this.updateStrictValidation()
    }
  }
}
