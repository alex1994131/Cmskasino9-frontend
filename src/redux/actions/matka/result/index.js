import {AXIOS_REQUEST,Set_reducer,set_page} from "../../auth/index"
import { toast } from "react-toastify";
import confirm from "reactstrap-confirm"
import {MATKA_RESULT_GET_DATA,MATKA_RESULT_PAGENATION,MATKA_RESULT_FILTER_DATA,MATKA_RESULT_BAZAARLIST_DATA} from "../../../types/matka"

export const getData = (params,date) => {
  return  async (dispatch) => {
    var rdata = await AXIOS_REQUEST("satta/get_result",{query : date},dispatch,true);
    if(rdata.status){
        dispatch({type : MATKA_RESULT_BAZAARLIST_DATA,data : rdata.bazaars})
        Set_reducer(dispatch,params,rdata,MATKA_RESULT_GET_DATA);
    }else{
      toast.error("fail")
    }
  }
}

export const filterData = value => {
  return dispatch => dispatch({ type: MATKA_RESULT_FILTER_DATA, value })
}

export const pagenationchange = (params,data)=>{
    return (dispatch,getState)=>{
      var row = {
        data : getState().matka.applications.allData
      }
      var rows =  set_page(params,row)
      var fdata = rows['fdata'];
      var totalPages = rows['totalPages'];
      dispatch({ type:MATKA_RESULT_PAGENATION,data: fdata,totalPages:totalPages,params})
    }
}

export const menudelete = (value,params,date)=>{
  return async(dispatch)=>{
    var result = await confirm();
    if(result){
      var rdata = await AXIOS_REQUEST("satta/delete_result",{data : value,query : date},dispatch,true)
        if(rdata.status){
          Set_reducer(dispatch,params,rdata,MATKA_RESULT_GET_DATA)
        }else{
            toast.error("fail")
        }
    }
  }
}

export const revenushow =(data,params,date)=>{
  return async(dispatch)=>{
    var rdata = await AXIOS_REQUEST("satta/get_renuve_frombazzar",{data : data,query : date},dispatch,true);
    if(rdata.status){
      return rdata.data;
    }else{
      return false;
    }
  }
}
export const menusave =(data,params,date)=>{
    return async(dispatch)=>{
      var rdata = await AXIOS_REQUEST("satta/create_result",{data : data,query : date},dispatch,true)
        if(rdata.status){
          Set_reducer(dispatch,params,rdata,MATKA_RESULT_GET_DATA)

        }else{
          toast.warn("Already Exist")
        }
    }
}

export const menuupdate = (datas,params,date)=>{
    return async(dispatch)=>{
      var rdata = await AXIOS_REQUEST("satta/update_result",{data : datas,query : date},dispatch,true)
        if(rdata.status){
            Set_reducer(dispatch,params,rdata,MATKA_RESULT_GET_DATA)
        }else{
          toast.error("fail")
        }
    }
}

export const todayresult = (params,date) =>{
  return async(dispatch)=>{
    var rdata = await AXIOS_REQUEST("satta/get_result",{query : {start : new Date(),end : new Date(new Date().valueOf() + 60 * 60 * 24 * 1000)}},dispatch,true);
    if(rdata.status){
        dispatch({type : MATKA_RESULT_BAZAARLIST_DATA,data : rdata.bazaars})
        Set_reducer(dispatch,params,rdata,MATKA_RESULT_GET_DATA);
    }else{
      toast.error("fail")
    }
  }
}

export const allresult = (params,date) =>{
  return async(dispatch)=>{
    var rdata = await AXIOS_REQUEST("satta/all_result",{query : date},dispatch,true)
      if(rdata.status){
          Set_reducer(dispatch,params,rdata,MATKA_RESULT_GET_DATA)
      }else{
        toast.error("fail")
      }
  }
}
