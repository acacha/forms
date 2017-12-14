import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

import {CREATE_ACTION} from '../../../Form'

const namespaced = true

export default function (form) {
  return {
    namespaced,
    state: {
      form: form,
      loading: false,
      action: CREATE_ACTION,
      resource_id: null
    },
    getters,
    mutations,
    actions
  }
}
