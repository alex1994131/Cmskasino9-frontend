import { combineReducers } from "redux"
import {pro_credential} from "./pro_credential"
import {configuration} from "./configuration"
const setting = combineReducers({
  pro_credential,
  configuration
})

export default setting