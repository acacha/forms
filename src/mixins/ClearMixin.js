export default {
  data: function () {
    return {
      clearing: false
    }
  },
  methods: {
    confirmClear () {
      this.clearing = true
    },
    clear () {
      this.$store.dispatch('acacha-forms/resetFormAction')
      this.clearing = false
    }
  }
}
