import {AXIOS_REQUEST,Set_reducer,set_page} from "../../auth/index"
import { toast } from "react-toastify";
import confirm from "reactstrap-confirm"
import {MATKA_BAZAARS_GET_DATA,MATKA_BAZAARS_PAGENATION,MATKA_BAZAARS_FILTER_DATA,MATKA_GAMES_GMAELIST_DATA} from "../../../types/matka"

export const getData = (params) => {
  return  async (dispatch) => {
    var rdata = await AXIOS_REQUEST("satta/get_bazaars",{},dispatch,true)
    if(rdata.status){
      dispatch({type : MATKA_GAMES_GMAELIST_DATA,data:rdata.gamelist})
      Set_reducer(dispatch,params,rdata,MATKA_BAZAARS_GET_DATA);
    }else{
      toast.error("fail")
    }
  }
}

export const gamelink_save = (item,params) =>{
  return async (dispatch) =>{
    var rdata = await AXIOS_REQUEST("satta/gamelink",{data : item},dispatch,true)
    if(rdata.status){
      Set_reducer(dispatch,params,rdata,MATKA_BAZAARS_GET_DATA)

    }else{
      toast.error("fail")
    }
  }
}

export const filterData = value => {
  return dispatch => dispatch({ type: MATKA_BAZAARS_FILTER_DATA, value })
}

export const pagenationchange = (params,data)=>{
    return (dispatch,getState)=>{
      var row = {
        data : getState().matka.bazaars.allData
      }
      var rows =  set_page(params,row)
      var fdata = rows['fdata'];
      var totalPages = rows['totalPages'];
      dispatch({ type:MATKA_BAZAARS_PAGENATION,data: fdata,totalPages:totalPages,params})
    }
  }

export const menudelete = (value,params)=>{
  return async(dispatch)=>{
    var result = await confirm();
    if(result){
      var rdata = await AXIOS_REQUEST("satta/delete_bazaars",{data : value},dispatch,true)
        if(rdata.status){
          Set_reducer(dispatch,params,rdata,MATKA_BAZAARS_GET_DATA)
        }else{
            toast.error("fail")
        }
    }
  }
}

export const menusave =(data,params)=>{
    return async(dispatch)=>{
      var rdata = await AXIOS_REQUEST("satta/create_bazaars",{data : data},dispatch,true)
        if(rdata.status){
          Set_reducer(dispatch,params,rdata,MATKA_BAZAARS_GET_DATA)

        }else{
          toast.error("fail")
        }
    }
}

export const menuupdate = (datas,params)=>{
    return async(dispatch)=>{
      var rdata = await AXIOS_REQUEST("satta/update_bazaars",{data : datas},dispatch,true)
        if(rdata.status){
            Set_reducer(dispatch,params,rdata,MATKA_BAZAARS_GET_DATA)
        }else{
          toast.error("fail")
        }
    }
}
