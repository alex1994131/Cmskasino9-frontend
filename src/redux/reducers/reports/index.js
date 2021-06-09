import { combineReducers } from "redux"
import {reportscasinogameid } from "./casino/gameid"
import {reportscasinoplayerid } from "./casino/playerid"
import {reportscasinoproviders } from "./casino/byproviders"
import {reportscasinoplaygameid } from "./casino/bybet"
const Reports = combineReducers({
    reportscasinogameid,
    reportscasinoplayerid,
    reportscasinoproviders,
    reportscasinoplaygameid
})

export default Reports