import FormModule from './modules/forms'
import Vuex from 'vuex'

const debug = process.env.NODE_ENV !== 'production'

export default function (form) {
  const initialForm = form

  const formModule = FormModule(form)
  return new Vuex.Store({
    modules: {
      formModule
    },
    strict: debug,
    initialForm
  })
}
