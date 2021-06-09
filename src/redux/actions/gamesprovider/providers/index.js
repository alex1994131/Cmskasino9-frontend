import {AXIOS_REQUEST} from "../../auth/index"
import { toast } from "react-toastify";
import {set_page} from "../../auth/index"
import {gameproviderload,gameproviderget,gameproviderfilter,gameproviderbool} from "../../../types/gameproviders";
import confirm from "reactstrap-confirm";

export const getData = (params,bool) => {
  return  async (dispatch) => {
    var rdata = await AXIOS_REQUEST("gameprovider/providerload",{bool :bool})
    if(rdata.status){
      var rows = set_page(params,rdata);
      var fdata =rows['fdata'];
      var totalPages = rows['totalPages'];
      dispatch({type :gameproviderbool,data : bool })
      dispatch({ type: gameproviderload, data: rdata.data })
      dispatch({
        type: gameproviderget,
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
  return dispatch => dispatch({ type: gameproviderfilter, value })
}

export const menusave =(data,params)=>{
    return async(dispatch,getState)=>{
      var bool = getState().gameproviders.providers.bool
      var rdata = await AXIOS_REQUEST("gameprovider/providersave",{data : data,bool : bool})
      if(rdata.status){
        var rows = set_page(params,rdata);
        dispatch({ type: gameproviderload, data: rdata.data })
        var fdata =rows['fdata'];
        var totalPages = rows['totalPages'];
        dispatch({
          type: gameproviderget,
          data: fdata,
          totalPages:totalPages,
          params
        })
      }else{
        toast.error("fail")
      }
  }
}

export const menudelete = (value,params)=>{
  return async(dispatch,getState)=>{
    var result =  await confirm();
    if(result){
      var bool = getState().gameproviders.providers.bool
      var rdata = await AXIOS_REQUEST("gameprovider/providerdelete",{data : value,bool : bool})
        if(rdata.status){
          var rows = set_page(params,rdata);
          var fdata =rows['fdata'];
          var totalPages = rows['totalPages'];
          dispatch({ type: gameproviderload, data: rdata.data })
          dispatch({
            type: gameproviderget,
            data: fdata,
            totalPages:totalPages,
            params
          })
          }else{
            toast.error("fail")
          }
    }else{
    }
  }
}

export const menuupdate = (datas,params)=>{
  return async(dispatch,getState)=>{
    var bool = getState().gameproviders.providers.bool

    var rdata = await AXIOS_REQUEST("gameprovider/providerupdate",{data : datas,bool : bool})
      if(rdata.status){
        var rows = set_page(params,rdata);
        var fdata =rows['fdata'];
        dispatch({ type: gameproviderload, data: rdata.data })
        var totalPages = rows['totalPages'];
        dispatch({
            type: gameproviderget,
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
      data : getState().gameproviders.providers.allData
    }
    var rows =  set_page(params,row)
    var fdata = rows['fdata'];
    var totalPages = rows['totalPages']
    dispatch({
      type: gameproviderget,
      data: fdata,
      totalPages:totalPages,
      params
    })
  }
}

export const allrefreshGames = ()=>{
  return async dispatch =>{
    toast.error("success")
    // await AXIOS_REQUEST("providermanager/allrefreshGames",)
  }
}