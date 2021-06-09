import {AXIOS_REQUEST} from "../../auth/index"
import { toast } from "react-toastify";
import {set_page} from "../../auth/index"

export const getData = (params,status) => {
  return  async (dispatch) => {
    var rdata = await AXIOS_REQUEST("players/KYCmenuload",{status : status})
    if(rdata.status){
      var rows = set_page(params,rdata);
      var fdata =rows['fdata'];
      var totalPages = rows['totalPages'];
      dispatch({ type: "KYC_GET_ALL_DATA", data: rdata.data })
      dispatch({
        type: "KYC_GET_DATA",
        data: fdata,
        totalPages:totalPages,
        params
      })
    }else{
      toast.error("fail")
    }
  }
}

export const filterData = value => {
  return dispatch => dispatch({ type: "KYC_FILTER_DATA", value })
}

export const menuupdate = (datas,params)=>{
    return async(dispatch)=>{
      var rdata = await AXIOS_REQUEST("players/KYCupdate",{data : datas})
    
        if(rdata.status){
          toast.success("Successfully")
          var rows = set_page(params,rdata);
          var fdata =rows['fdata'];
          dispatch({ type: "KYC_GET_ALL_DATA", data: rdata.data })
          var totalPages = rows['totalPages'];
          dispatch({
              type: "KYC_GET_DATA",
              data: fdata,
              totalPages:totalPages,
              params
          })
        }else{
          toast.error("fail")
        }
    }
}