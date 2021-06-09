import {AXIOS_REQUEST,Set_reducer} from "../auth/index"
import {toast} from "react-toastify";

export const getSportsList = () => {
  return async(dispatch) => {
    var rdata = await AXIOS_REQUEST("sport/load_sport_type_client" , {} , dispatch , true);
    if(rdata.status){
        dispatch({ type : "SPORTS_LIST", data : Object.assign({} , {data : rdata.data})});
    }else{
        toast.error("error");   
    }
  }
}

export const getSportData = (params , sendData) => {
  return async(dispatch) => {
    var rdata = await AXIOS_REQUEST("sport/load_sport_matchs" , sendData , dispatch , true)
    if(rdata.status){
      var AllData = [];
      var id = 0;
      for(let i = 0 ; i < rdata.data.length ; i ++){
        if(rdata.data[i].market && rdata.data[i].market.length){
          id ++;
          rdata.data[i].id = id;
          rdata.data[i].market_len = rdata.data[i].market.length;
          var index = AllData.findIndex(item => item.event_id === rdata.data[i].event_id);
          if(index > -1){
            AXIOS_REQUEST("sport/remove_duplicate" , {first : AllData[index] , second : rdata.data[i]} , dispatch , true);
            continue;
          }else{
            AllData.push(rdata.data[i]);
          }
        }
      }
      Set_reducer(dispatch,params,{data : AllData},"SPORTS_MATCHS");
    }else{
        toast.error("error");   
    }
  }
}

export const changeStatus = (row , params , key) => {
  return async(dispatch , getState) => {
    var sendData = {row , key};
    var rdata = await AXIOS_REQUEST("sport/change_status" , sendData , dispatch , false)
    if(rdata.status){
      var data = getState().sports.sports_data.allData;

      var newData = [];
      for(var i = 0 ; i < data.length ; i ++){
        if(data[i].event_id === row.event_id){
          var temp = data[i];
          temp.permission = key;
          newData.push(temp);
        }else{
          newData.push(data[i])
        }
      }

      // var index = data.findIndex(item => item.event_id === row.event_id);
      // if(index){
      //   data[index].permission = key;
      // }

      Set_reducer(dispatch,params,Object.assign({} , {data : []}),"SPORTS_MATCHS");
      Set_reducer(dispatch,params,Object.assign({} , {data : newData}),"SPORTS_MATCHS");
    }else{
      toast.error("error");
    }
  }
}

export const pagenationchange = (params)=>{
  return (dispatch,getState)=>{
    Set_reducer(dispatch,params,{data : getState().sports.sports_data.allData},"SPORTS_MATCHS");
  }
}