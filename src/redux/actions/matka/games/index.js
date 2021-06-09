import {AXIOS_REQUEST,Set_reducer,set_page} from "../../auth/index"
import { toast } from "react-toastify";
import confirm from "reactstrap-confirm"
import {MATKA_GAMES_GET_DATA,MATKA_GAMES_PAGENATION,MATKA_GAMES_FILTER_DATA} from "../../../types/matka"

export const getData = (params,bool) => {
  return  async (dispatch) => {
    var rdata = await AXIOS_REQUEST("satta/get_games",{},dispatch,true)
    if(rdata.status){
      Set_reducer(dispatch,params,rdata,MATKA_GAMES_GET_DATA)
    }else{
      toast.error("fail")
    }
  }
}

export const filterData = value => {
  return dispatch => dispatch({ type: MATKA_GAMES_FILTER_DATA, value })
}

export const pagenationchange = (params,data)=>{
    return (dispatch,getState)=>{
      var row = {
        data : getState().matka.gameslist.allData
      }
      var rows =  set_page(params,row)
      var fdata = rows['fdata'];
      var totalPages = rows['totalPages'];
      dispatch({ type:MATKA_GAMES_PAGENATION,data: fdata,totalPages:totalPages,params})
    }
  }

export const menudelete = (value,params,bool)=>{
  return async(dispatch)=>{
    var result = await confirm();
    if(result){
      var rdata = await AXIOS_REQUEST("satta/delete_games",{data : value,bool : bool},dispatch,true)
        if(rdata.status){
          Set_reducer(dispatch,params,rdata,MATKA_GAMES_GET_DATA)
        }else{
            toast.error("fail")
        }
    }
  }
}

export const menusave =(data,params,bool)=>{
    return async(dispatch)=>{
      var rdata = await AXIOS_REQUEST("satta/create_games",{data : data},dispatch,true)
        if(rdata.status){
          Set_reducer(dispatch,params,rdata,MATKA_GAMES_GET_DATA)

        }else{
          toast.error("fail")
        }
    }
}

export const menuupdate = (datas,params)=>{
    return async(dispatch)=>{
      var rdata = await AXIOS_REQUEST("satta/update_games",{data : datas},dispatch,true)
        if(rdata.status){
            Set_reducer(dispatch,params,rdata,MATKA_GAMES_GET_DATA)
        }else{
          toast.error("fail")
        }
    }
}


export const filesupload = (datas,params)=>{
  return async(dispatch)=>{
    var rdata = await AXIOS_REQUEST("satta/imgupload_games",datas,dispatch,true)
      if(rdata.status){
          Set_reducer(dispatch,params,rdata,MATKA_GAMES_GET_DATA)
      }else{
        toast.error("fail")
      }
  }
}