import {AXIOS_REQUEST,set_page} from "../../auth/index"
import { toast } from "react-toastify";
import {SPORTS_MENULIST_ALLDATA,SPORTS_MENULIST_GETDATA,SPORTS_MENULIST_FILTERDATA} from "../../../types/cms"

export const getData = (params) => {
  return  async (dispatch) => {
    var rdata = await AXIOS_REQUEST("sport/load_sportsdata",{})
    if(rdata.status){
      var rows = set_page(params,rdata);
      var fdata =rows['fdata'];
      var totalPages = rows['totalPages'];
      dispatch({ type: SPORTS_MENULIST_ALLDATA, data: rdata.data })
      dispatch({
        type: SPORTS_MENULIST_GETDATA,
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
  return dispatch => dispatch({ type: SPORTS_MENULIST_FILTERDATA, value })
}

export const menuupdate = (datas,params)=>{
    return async(dispatch)=>{
      var rdata = await AXIOS_REQUEST("sport/sports_update",{data : datas})
        if(rdata.status){
          var rows = set_page(params,rdata);
          var fdata =rows['fdata'];
          dispatch({ type: SPORTS_MENULIST_ALLDATA, data: rdata.data })
          var totalPages = rows['totalPages'];
          dispatch({
              type: SPORTS_MENULIST_GETDATA,
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
        type:SPORTS_MENULIST_GETDATA,
        data: fdata,
        totalPages:totalPages,
        params
      })
    }
}