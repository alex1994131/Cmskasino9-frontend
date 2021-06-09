import {AXIOS_REQUEST,Set_reducer,set_page} from "../../auth/index"
import { toast } from "react-toastify";
import confirm from "reactstrap-confirm"
import {MATKA_APPLICATIONS_GET_DATA,MATKA_APPLICATIONS_PAGENATION,MATKA_APPLICATIONS_FILTER_DATA,MATKA_APPLICATIONS_BAZAARLIST_DATA} from "../../../types/matka"

export const getData = (params,) => {
  return  async (dispatch) => {
    var rdata = await AXIOS_REQUEST("satta/get_applications",{},dispatch,true)
    if(rdata.status){
        var rows = [];
        let bazaars = rdata.bazaarlist;
        for(var i in bazaars){
            rows.push({value : bazaars[i]._id,label : bazaars[i].bazaarname});
        }
        dispatch({type : MATKA_APPLICATIONS_BAZAARLIST_DATA,data:rows})
        Set_reducer(dispatch,params,rdata,MATKA_APPLICATIONS_GET_DATA)
    }else{
      toast.error("fail")
    }
  }
}

export const filterData = value => {
  return dispatch => dispatch({ type: MATKA_APPLICATIONS_FILTER_DATA, value })
}

export const pagenationchange = (params,data)=>{
    return (dispatch,getState)=>{
      var row = {
        data : getState().matka.applications.allData
      }
      var rows =  set_page(params,row)
      var fdata = rows['fdata'];
      var totalPages = rows['totalPages'];
      dispatch({ type:MATKA_APPLICATIONS_PAGENATION,data: fdata,totalPages:totalPages,params})
    }
  }

export const menudelete = (value,params)=>{
  return async(dispatch)=>{
    var result = await confirm();
    if(result){
      var rdata = await AXIOS_REQUEST("satta/delete_applications",{data : value},dispatch,true)
        if(rdata.status){
          Set_reducer(dispatch,params,rdata,MATKA_APPLICATIONS_GET_DATA)
        }else{
            toast.error("fail")
        }
    }
  }
}

export const menusave =(data,params)=>{
    return async(dispatch)=>{
      var rdata = await AXIOS_REQUEST("satta/create_applications",{data : data},dispatch,true)
        if(rdata.status){
          Set_reducer(dispatch,params,rdata,MATKA_APPLICATIONS_GET_DATA)

        }else{
          toast.error("fail")
        }
    }
}

export const menuupdate = (datas,params)=>{
    return async(dispatch)=>{
      var rdata = await AXIOS_REQUEST("satta/update_applications",{data : datas},dispatch,true)
        if(rdata.status){
            Set_reducer(dispatch,params,rdata,MATKA_APPLICATIONS_GET_DATA)
        }else{
          toast.error("fail")
        }
    }
}
