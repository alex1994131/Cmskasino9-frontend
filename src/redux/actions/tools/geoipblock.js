import {AXIOS_REQUEST} from "../auth/index"
import { toast } from "react-toastify";
import {set_page} from "../auth/index"
import {ToolGeoIpBlock_getdata,ToolGeoIpBlock_filter,ToolGeoIpBlock_load} from "../../types/tool"
import confirm from "reactstrap-confirm";

export const Set_reducer = (dispatch,rdata,params) =>{
  var rows =  set_page(params,rdata);
  var fdata = rows['fdata'];
  var totalPages = rows['totalPages'];
  dispatch({ type: ToolGeoIpBlock_load,data: fdata,totalPages:totalPages,params : rows['params'],alldata : rdata.data});
}
export const getData = (params) => {
  return  async (dispatch) => {
    var rdata = await AXIOS_REQUEST("Tools/geoipblock_load")
    if(rdata.status){
      Set_reducer(dispatch,rdata,params);
    }else{
      toast.error("fail")
    }
  }
}

export const filterData = value => {
  return dispatch => dispatch({ type: ToolGeoIpBlock_filter, value })
}

export const menusave =(data,params)=>{
    return async(dispatch,getState)=>{

      var rdata = await AXIOS_REQUEST("Tools/geoipblock_save",{data : data})
      if(rdata.status){
        Set_reducer(dispatch,rdata,params);

      }else{
        toast.error("fail")
      }
  }
}

export const menudelete = (value,params)=>{
  return async(dispatch,getState)=>{
    var result =  await confirm();
    if(result){
      var rdata = await AXIOS_REQUEST("Tools/geoipblock_delete",{data : value})
        if(rdata.status){
          Set_reducer(dispatch,rdata,params);

          }else{
            toast.error("fail")
          }
    }else{
    }
  }
}

export const pagenationchange = (params,data)=>{
  return (dispatch,getState)=>{
    var row = {
      data : getState().tools.toolsgeoipblock.allData
    }
    var rows =  set_page(params,row)
    var fdata = rows['fdata'];
    var totalPages = rows['totalPages'];
    dispatch({ type:ToolGeoIpBlock_getdata,data: fdata,totalPages:totalPages,params})
  }
}
