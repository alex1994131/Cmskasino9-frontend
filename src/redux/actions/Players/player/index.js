import {AXIOS_REQUEST} from "../../auth/index"
import {toast} from "react-toastify"
import {set_page} from "../../auth/index"
import {history} from "../../../../history"

export const setReducer = (dispatch,rdata,params,filterData)=>{
  var rows =  set_page(params,rdata);
  var fdata = rows['fdata'];
  var totalPages = rows['totalPages'];
  dispatch({ type: "PLAYERS_GET_DATA",data: fdata,totalPages:totalPages,params : rows['params'],alldata : rdata.data});
}

export const getInactivePlayers = (params,date) =>{
  return async dispatch =>{
    var rdata = await AXIOS_REQUEST('players/get_inactivePlayers',{start :  date.start,end : date.end},dispatch,true);
    if(rdata){
      setReducer(dispatch,rdata,params,filterData);
    }else{
      toast.error("fail")
    }
  }
}

export const getData = (params,filterData) => {
  return  async(dispatch) => {
    var rdata = await AXIOS_REQUEST("players/playerlist",{},dispatch,true)
      if(rdata.status){      
        setReducer(dispatch,rdata,params,filterData);
      }else{
        toast.error("fail");
      }
  }
}

export const signup = (users,params) => {
  return async(dispatch) =>{
    var rdata =  await AXIOS_REQUEST("users/adminplayerregister",{user : users},dispatch,true)
      if(rdata.status){
        toast.success("success")
        setReducer(dispatch,rdata,params);
      }else{
        toast.error(rdata.data);
      }
  }
}

export const multiBlockAction = (params,rows) =>{
  return async dispatch =>{
    if (rows.length > 0){
      var rdata = await AXIOS_REQUEST("players/multiblock",{users : rows},dispatch,true)
      if(rdata.status){
        setReducer(dispatch,rdata,params,filterData);
      }else{
        
      }
    }else{
      toast.warn("Please select items");

    }
  }
}

export const userDetailShow = (row) =>{
  return  dispatch =>{
    // if(row.permission === playerid){
      history.push('/Players/infor',row);
    // }
  }
}

export const update_action = (users,params) =>{
  return async dispatch =>{
    // var rdata = await AXIOS_REQUEST("players/playerupdate",{users : users},dispatch,true)
    // if(rdata.status){
    //   setReducer(dispatch,rdata,params,filterData);
    // }else{
      
    // }
  }
}

export const resetpass = (params,row) =>{
  return async dispatch =>{
    var rdata = await AXIOS_REQUEST("players/playerresetpass",{user : row},dispatch,true)
    if(rdata.status){
      toast.success("successfully")
      
      // setReducer(dispatch,rdata,params,filterData);
    }else{
      
    }
  }    
}

export const filterData = (value,bool) => {
  return dispatch => dispatch({ type: "PLAYERS_FILTER_DATA", value : value,bool : bool })
}

export const depositAction = (data,params,filterData) =>{
  return async(dispatch)=>{
    var rdata = await AXIOS_REQUEST("players/deposittion",{data : data},dispatch,true)
    if(rdata.status){
      toast.success("successfully")
      setReducer(dispatch,rdata,params,filterData);
    }else{
      toast.warn(rdata.data)

    }

  }
}

export const withdrawalAction = (data,params,filterData) =>{
  return async(dispatch)=>{
    var rdata = await AXIOS_REQUEST("players/withdrawaction",{data : data},dispatch,true)
      if(rdata.status){
      toast.success("successfully")
      setReducer(dispatch,rdata,params,filterData);
      }else{
      toast.warn(rdata.data)
        
      }
  }
}

export const pagenationChange = (params,data)=>{
  return (dispatch,getState)=>{
    var row = {
      data : getState().Players.playerslist.allData
    }
    var rows =  set_page(params,row)
    var fdata = rows['fdata'];
    var totalPages = rows['totalPages']
    dispatch({
      type:"PLAYERS_SET_PAGENATION",
      data: fdata,
      totalPages:totalPages,
      params
    })
  }
}