



import { combineReducers } from "redux"
import {finance} from "./finance"
import {payoutchannel} from "./payoutchnnel"
import {bankdetail} from "./bankdetail"

const financepart = combineReducers({
  finance,
  payoutchannel,
  bankdetail
});

export default financepart