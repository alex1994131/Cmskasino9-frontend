import {AXIOS_REQUEST,Set_reducer,set_page} from "../../auth/index"
import { toast } from "react-toastify";
import {history} from "../../../../history"
import {MATKA_ANOUNCER_GET_DATA,MATKA_ANOUNCER_PAGENATION} from "../../../types/matka"


export const getData = (date) => {
  return  async (dispatch) => {
    var rdata = await AXIOS_REQUEST("satta/admin_get_load_bazaars",{date : date},dispatch,true)
    if(rdata.status){
      dispatch({type : "SATTA_DAHSBOARD_REGULAR",data : rdata.data});
    }else{
      toast.error("fail")
    }
  }
}

export const get_bets_frombazaar = (bazzarItem,date) => {
  return async dispatch =>{
    var rdata = await AXIOS_REQUEST("satta/get_bets_from_bazarr",{bazzarItem,date},dispatch,true);
    if(rdata.status){   
      let bazaritem = bazzarItem;
      let numbers = rdata.data;
      history.push("/matka/dashboard/numbers",{numbers,bazaritem});
    }else{
    }    
  }
}


export const create_result = (row) =>{
  return async dispatch =>{
  }
}


export const get_bets_fromresultannouncer = (params,bazzarItem,date) =>{
  return async (dispatch,getState) =>{
    console.log(getState());
    var rdata = await AXIOS_REQUEST("satta/get_bets_from_resultannouncer",{bazzarItem,date},dispatch,true);
    if(rdata.status){   
      // let win_numbers = rdata.data;
      // let bazaritem = bazzarItem;
      Set_reducer(dispatch,params,rdata,MATKA_ANOUNCER_GET_DATA);
    }else{
    }    
  }
}

export const go_toPage_resultannounce = (bazaritem,date) =>{
  return (dispatch,getState) =>{
    let gamesdata = getState().matka.regular.gamesdata;
    history.push("/matka/dashboard/resultannouncer",{gamesdata,bazaritem,date});
  }
}
  

export const pagenations = (params) =>{
    return (dispatch,getState)=>{
      var row = {
        data : getState().matka.announcer.allData
      }
      var rows =  set_page(params,row)
      var fdata = rows['fdata'];
      var totalPages = rows['totalPages'];
      dispatch({ type:MATKA_ANOUNCER_PAGENATION,data: fdata,totalPages:totalPages,params})
    }
}
// export const get_games_from_bazaar = (bazaaritem,date) =>{
//     return async (dispatch) =>{
//         var rdata = await AXIOS_REQUEST("satta/get_games_from_bazarr",{data : bazaaritem,query : date},dispatch,true);
//         if(rdata.status){   
//             dispatch({type : "SATTA_DAHSBOARD_REGULAR_CHILD",data : rdata.data});

//         }else{

//         }
//     }
// }

// export const get_numberslist = (data,date) =>{
//     return async (dispatch) =>{
//         var rdata = await AXIOS_REQUEST("satta/get_numbers_from_games",{data : data,query : date},dispatch,true);
//         if(rdata.status){
//             dispatch({type : "SATTA_DAHSBOARD_REGULAR_NUMBERS",data : rdata.data});
//         }else{

//         }
//     }
// }

// export const get_bazaarsitems = () =>{
//   return async (dispatch) =>{
//       var rdata = await AXIOS_REQUEST("satta/load_bazaars",{},dispatch,true)
//       console.log(rdata.data)
//       if(rdata.status){
//           dispatch({ type: "SATTA_DAHSBOARD_REGULAR", data: rdata.data });
//       }else{
//           toast.error(rdata.data);   
//       }
//   }
// }