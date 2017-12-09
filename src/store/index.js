import formModule from './modules/forms'
import Vuex from 'Vuex'

const debug = process.env.NODE_ENV !== 'production'

export default function (form) {
  formModule = formModule(form)
  return new Vuex.Store({
    modules: {
      formModule
    },
    strict: debug
  })
}
