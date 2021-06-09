import {FINANCE_TRANSACTIONS_GET,FINANCE_TRANSACTIONS_FILTER} from "../../types/finance"

const initialState = {
    data: [],
    params: null,
    allData: [],
    totalPages: 0,
    filteredData: [],
    totalRecords: 0,
    sortIndex: [],
  }
  
  
  const getIndex = (arr, arr2, arr3, params = {}) => {
    if (arr2.length > 0) {
      let startIndex = arr.findIndex(i => i.id === arr2[0].id) + 1
      let endIndex = arr.findIndex(i => i.id === arr2[arr2.length - 1].id) + 1
      let finalArr = [startIndex, endIndex]
      return (arr3 = finalArr)
    } else {
      let finalArr = [arr.length - parseInt(params.perPage), arr.length]
      return (arr3 = finalArr)
    }
  }

 export  const finance = (state = initialState, action) => {
    switch (action.type) {
      case FINANCE_TRANSACTIONS_GET:
        return {
          ...state,
          data: action.data,
          totalPages: action.totalPages,
          params: action.params,
          sortIndex: getIndex(
            action.allData,
            action.data,
            state.sortIndex,
            action.params
          ),
          totalRecords: action.data.length,
          allData: action.allData,
        }
      case FINANCE_TRANSACTIONS_FILTER :
        return {
          ...state,
          providerData : action.data,
          moredata : action.moredata
        }
      default:
        return state
    }
  }
  
   
