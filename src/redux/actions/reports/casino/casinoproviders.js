import {AXIOS_REQUEST,alert} from "../../auth/index"
import {REPORTSCASINO_PROVIDERS_LOAD,REPORTSCASINO_PROVIDERS_GETDATA} from "../../../types/reports"


export const getTotal = (filters) => {
  return async dispatch =>{
    let rdata = await AXIOS_REQUEST("reports/report_byprovider_total",{ filters},dispatch,true);
    if(rdata.status){
      dispatch({
        type: REPORTSCASINO_PROVIDERS_GETDATA,
        data: rdata.data
      });
    }else{
      alert("error","error")
    }
  }
}

export const getData = (params,filters) => {
  return  async(dispatch) => {
    console.log(params)
    let rdata = await AXIOS_REQUEST("reports/report_byprovider_history",{filters,params},dispatch,true);
      if(rdata.status){
        var data = rdata.data;
        var totalPages = rdata.pageset["totalPages"];
        var pages = rdata.pageset;
        var totalRecords = rdata.pageset["totalRecords"]
          dispatch({
            type: REPORTSCASINO_PROVIDERS_LOAD,
            data: data,
            totalPages:totalPages,
            params : pages,
            totalRecords : totalRecords
          });
      }else{
        alert("error","error")
      }
  }
}