import {AXIOS_REQUEST,alert} from "../auth/index"
import { toast } from "react-toastify"

export const PaymentconfigLoad = type => {
    return  async(dispatch) => {
      var rdata = await AXIOS_REQUEST("paymentGateWay/paymentConfigLoad",{type})
          if(rdata.status){
              dispatch({ type: "PAYMENTMENU_CONFIG_DATA", data: rdata.data })
          }else{
              toast.error(rdata.data);
          }
    }
}
  
export const PaymentconfigSave = params => {
    return  async(dispatch) => {
      var rdata = await AXIOS_REQUEST("paymentGateWay/paymentConfigSave",{params})
      if(rdata.status){
          toast.success(rdata.data);   
      }else{
          toast.error(rdata.data);   
      }
    }
}

// export const QpayCheckOut = params => {
//     return  async(dispatch) => {
//         if(!params.email){
//             toast.error('email undefined');   
//         }else{
//             var rdata = await AXIOS_REQUEST("paymentGateWay/QpayCheckOut",{params})
//                 if(rdata.status){
//                     dispatch({ type: "PAYMENTGATEWAY_QPAY_CHEKOUT_DATA", data: rdata });
//                 }else{
//                     toast.error(rdata.data);   
//                 }
//         }
//     }
// }

// export const QpayResults = order_no => {
//     return  async(dispatch) => {
//       var rdata = await AXIOS_REQUEST("paymentGateWay/QpayResults",{order_no})
//           if(rdata.status){
//               dispatch({ type: "PAYMENTGATEWAY_QPAY_RESULTS_DATA", data: rdata.data })
//           }else{
//               toast.error(rdata.data);   
//           }
//     }
// }

function reduxload(rdata,dispatch) {
  var data = rdata.data;
  var totalPages = rdata.pageset["totalPages"];
  var pages = rdata.pageset;
  var totalRecords = rdata.pageset["totalRecords"]
  dispatch({
    type: "PAYMENTMENU_GET_DATA",
    data: data,
    totalPages:totalPages,
    params : pages,
    totalRecords : totalRecords,
    typeoptions : rdata.typeoptions
  });
}

export const getData = (params) => {
  return  async (dispatch) => {
    var rdata = await AXIOS_REQUEST("paymentGateWay/adminmenuload",{params})
    if(rdata.status){
      reduxload(rdata,dispatch)
    }else{
      toast.error("fail")
    }
  }
}



export const menudelete = (data,params)=>{
  return async(dispatch)=>{
    var rdata = await AXIOS_REQUEST("paymentGateWay/menudelete",{data,params})
      if(rdata.status){
        alert("success","success")
        reduxload(rdata,dispatch)
      }else{
        toast.error("fail")
      }
  }
}

export const menusave =(data,params)=>{
    return async(dispatch)=>{
      var rdata = await AXIOS_REQUEST("paymentGateWay/menusave",data)
        if(rdata.status){
          alert("success","success")
          reduxload(rdata,dispatch)
        }else{
          toast.error("fail")
        }
    }
}


export const menuupdate = (data,params)=>{
    return async(dispatch)=>{
      var rdata = await AXIOS_REQUEST("paymentGateWay/menuupdate",{data,params})
        if(rdata.status){
          alert("success","success")
          reduxload(rdata,dispatch)
        }else{
          toast.error("fail")
        }
    }
}