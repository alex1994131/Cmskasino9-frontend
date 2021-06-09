import {AXIOS_REQUEST,set_page} from "../../auth/index"
import { toast } from "react-toastify";
import {EXCHG_MENULIST_ALLDATA,EXCHG_MENULIST_GETDATA,EXCHG_MENULIST_FILTERDATA} from "../../../types/cms"

export const getExchgData = (params) => {
  return  async (dispatch) => {
    var rdata = await AXIOS_REQUEST("exchg/load_exchgdata" , {} );
    if(rdata.status){
      var rows = set_page(params,rdata);
      var fdata =rows['fdata'];
      var totalPages = rows['totalPages'];
      dispatch({ type: EXCHG_MENULIST_ALLDATA, data: rdata.data })
      dispatch({
        type: EXCHG_MENULIST_GETDATA,
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
  return dispatch => dispatch({ type: EXCHG_MENULIST_FILTERDATA, value })
}

export const menuupdate = (datas,params)=>{
    return async(dispatch)=>{
      var rdata = await AXIOS_REQUEST("exchg/exchg_update",{data : datas})
        if(rdata.status){
          var rows = set_page(params,rdata);
          var fdata =rows['fdata'];
          dispatch({ type: EXCHG_MENULIST_ALLDATA, data: rdata.data })
          var totalPages = rows['totalPages'];
          dispatch({
              type: EXCHG_MENULIST_GETDATA,
              data: fdata,
              totalPages:totalPages,
              params
          })
        }else{
          toast.error("fail")
        }
    }
}

export const pagenationchange = (params,data)=>{
    return (dispatch,getState)=>{
      var row = {
        data : getState().cms.sports.allData
      }
      var rows =  set_page(params,row)
      var fdata = rows['fdata'];
      var totalPages = rows['totalPages']
      dispatch({
        type:EXCHG_MENULIST_GETDATA,
        data: fdata,
        totalPages:totalPages,
        params
      })
    }
  }