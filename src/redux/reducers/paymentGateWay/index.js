const initialState = {
  paymentconfig : null,
  QpayCheckOutData : null,
  QpayResultsData : null,
  data: [],
  params: null,
  allData: [],
  totalPages: 0,
  filteredData: [],
  totalRecords: 0,
  sortIndex: [0,0],
  typeoptions : []
}

const PaymentGateWayReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PAYMENTMENU_CONFIG_DATA":
      return {...state, paymentconfig: action.data}
    case "PAYMENTGATEWAY_QPAY_CHEKOUT_DATA":
      return {...state, QpayCheckOutData: action.data}
    case "PAYMENTGATEWAY_QPAY_RESULTS_DATA":
      return {...state, QpayResultsData: action.data}


    case "PAYMENTMENU_GET_DATA":
      return {
        ...state,
        data: action.data,
        totalPages: action.totalPages,
        params: action.params["params"],
        sortIndex : [action.params["skip"] + 1,action.params["skip2"]],
        totalRecords: action.totalRecords,
        typeoptions : action.typeoptions
      }
    // case "PAYMENTMENU_GET_ALL_DATA":
    //   return {
    //     ...state,
    //     allData: action.data,
    //     totalRecords: action.data.length,
    //     sortIndex: getIndex(action.data, state.data, state.sortIndex)
    //   }
    default:
      return state
  }
}
  
export default PaymentGateWayReducer