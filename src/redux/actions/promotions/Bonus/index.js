import {AXIOS_REQUEST,set_page} from "../../auth/index"
import { toast } from "react-toastify";
import {PROMOTIONS_BONUS_GET_DATA,PROMOTIONS_BONUS_GET_ALL_DATA} from "../../../types/promotions"
import confirm from "reactstrap-confirm"

export const getData = (params) => {
  return  async (dispatch) => {
    var rdata = await AXIOS_REQUEST("promotions/bonusMenuload",{})
    if (rdata.status) {
      var rows = set_page(params,rdata);
      var fdata =rows['fdata'];
      var totalPages = rows['totalPages'];
      dispatch({ type: PROMOTIONS_BONUS_GET_ALL_DATA, data: rdata.data })
      dispatch({ type: PROMOTIONS_BONUS_GET_DATA, data: fdata, totalPages:totalPages, params})
    } else {
      toast.error("fail")
    }
  }
}

export const filterData = value => {
  return dispatch => dispatch({ type: "FIRSTMENU_FILTER_DATA", value })
}


export const menudelete = (value,params)=> {
  return async(dispatch)=>{
    let result = await confirm();
    if (result) {
      var rdata = await AXIOS_REQUEST("promotions/bonusmenu_delete",{data : value})
        if (rdata.status) {
          var rows = set_page(params,rdata);
          var fdata =rows['fdata'];
          var totalPages = rows['totalPages'];
          dispatch({ type: PROMOTIONS_BONUS_GET_ALL_DATA, data: rdata.data })
          dispatch({ type: PROMOTIONS_BONUS_GET_DATA, data: fdata, totalPages:totalPages, params })
        } else {
          toast.error("fail")
        }
    } else {

    }
  }
}

export const menusave =(data,params)=>{
    return async(dispatch)=>{
      var rdata = await AXIOS_REQUEST("promotions/bonusmenu_save",{data : data})
        if (rdata.status) {
          var rows = set_page(params,rdata);
          dispatch({ type: PROMOTIONS_BONUS_GET_ALL_DATA, data: rdata.data })
          var fdata =rows['fdata'];
          var totalPages = rows['totalPages'];
          dispatch({
            type: PROMOTIONS_BONUS_GET_DATA,
            data: fdata,
            totalPages:totalPages,
            params
          })
        } else {
          toast.error("fail")
        }
    }
}

export const menuupdate = (datas,params)=>{
    return async(dispatch)=>{
      var rdata = await AXIOS_REQUEST("promotions/bonus_menuupdate",{data : datas})
        if (rdata.status) {
          var rows = set_page(params,rdata);
          var fdata =rows['fdata'];
          dispatch({ type: PROMOTIONS_BONUS_GET_ALL_DATA, data: rdata.data })
          var totalPages = rows['totalPages'];
          dispatch({
              type: PROMOTIONS_BONUS_GET_DATA,
              data: fdata,
              totalPages:totalPages,
              params
          })
        } else {
          toast.error("fail")
        }
    }
}