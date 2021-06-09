import {gameproviderget,gameproviderload,gameproviderfilter,gameproviderbool} from "../../types/gameproviders"
import {getIndex} from "../../actions/auth/index"
const initialState = {
    data: [],
    params: null,
    allData: [],
    totalPages: 0,
    filteredData: [],
    totalRecords: 0,
    sortIndex: [],
    allgamedata : []
  }
  
export  const providers = (state = initialState, action) => {
    switch (action.type) {
      case gameproviderget:
        return {
          ...state,
          data: action.data,
          totalPages: action.totalPages,
          params: action.params,
          sortIndex: getIndex(
            state.allData,
            action.data,
            state.sortIndex,
            action.params
          )
        }
      case gameproviderload:
        return {
          ...state,
          allData: action.data,
          totalRecords: action.data.length,
          sortIndex: getIndex(action.data, state.data, state.sortIndex)
        }

      case gameproviderbool :
        return {
          ...state,bool : action.data
        }

      case gameproviderfilter:
        let value = action.value
        let filteredData = []
        if (value.length) {
          filteredData = state.allData
            .filter(item => {
              let startsWithCondition =
                item.provider.toLowerCase().startsWith(value.toLowerCase())
              let includesCondition =
              item.provider.toLowerCase().startsWith(value.toLowerCase())  
              if (startsWithCondition) {
                return startsWithCondition
              } else if (!startsWithCondition && includesCondition) {
                return includesCondition
              } else return null
            })
            .slice(state.params.page - 1, state.params.perPage)
          return { ...state, filteredData }
        } else {
          filteredData = state.data
          return { ...state, filteredData }
        }
      
        case "GET_ALLGMAESLISTDATA" : 
        return {...state,allgamedata : action.data}
      default:
        return state
    }
  }