import { combineReducers } from "redux"
import {bazaars} from "./bazaars"
import {gameslist} from "./games"
import {regular} from "./regular"
import {Result} from "./result"
import {announcer} from "./anouncer"

const Players = combineReducers({
    gameslist,
    bazaars,
    regular,
    Result,
    announcer
});

export default Players