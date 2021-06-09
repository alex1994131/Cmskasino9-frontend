import { combineReducers } from "redux"
import { providers} from "./gameproviders"
// import { livecasinoproviders} from "./live-casino"
// import { casinoproviders} from "./casino"

const gameproviders = combineReducers({
    providers,
    // livecasinoproviders,
    // casinoproviders,
})

export default gameproviders