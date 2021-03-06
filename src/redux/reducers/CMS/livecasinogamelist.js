
import {cmslivecasinoget,cmslivecasinoload,cmslivecasinofilter,cmslivecasinoTypes,cmslivecasinoProvider,cmslivecasinoSetProvider,cmslivecasinoSetType
} from "../../types/cms"
import {getIndex,set_page} from "../../actions/auth/index"

const initialState = {
    data: [],
    params: null,
    allData: [],
    totalPages: 0,
    filteredData: [],
    totalRecords: 0,
    sortIndex: [0,0],
    providerData : [],
    types : [],
    settype : {label : "All",value : ''},
    setprovider : {label : "All",value : ''},
    moredata : [],
    deftypes : [],
    provideroptions : [],
    typeoptions : []
  }
  
export  const livecasinogamelist = (state = initialState, action) => {
    switch (action.type) {
      case cmslivecasinoget:
        return {
          ...state,
          typeoptions : action.typeoptions,
          provideroptions : action.provideroptions,
        }
      case cmslivecasinoload:
       
        return {
          ...state,
          data: action.data,
          totalPages: action.totalPages,
          params: action.params,
          totalRecords: action.totalRecords,
          sortIndex : [action.params["skip"] + 1,action.params["skip2"]],
          setproviderid : action.setproviderid
        }

      case cmslivecasinofilter:
        let value = action.value
        let filteredData = []
        if (value.length) {
          filteredData = state.allData
            .filter(item => {
              let startsWithCondition =
              item.NAME.toLowerCase().startsWith(value.toLowerCase()) ||
              item.ID.toLowerCase().startsWith(value.toLowerCase())

              let includesCondition =
              item.NAME.toLowerCase().includes(value.toLowerCase()) ||
              item.ID.toLowerCase().includes(value.toLowerCase())
              if (startsWithCondition) {
                return startsWithCondition
              } else if (!startsWithCondition && includesCondition) {
                return includesCondition
              } else return null
            })
            var rows =  set_page(state.params,{data : filteredData});
            var fdata = rows['fdata'];
            var totalPages = rows['totalPages'];
            // .slice(state.params.page - 1, state.params.perPage)
          return { ...state, filteredData : fdata,totalPages :totalPages,totalRecords : filteredData.length ,sortIndex: getIndex(
            filteredData,
            fdata,
            state.sortIndex,
            state.params
          ), }
        } else {
          filteredData = state.allData;
           rows =  set_page(state.params,{data : filteredData});
           fdata = rows['fdata'];
           totalPages = rows['totalPages'];
          return { ...state, filteredData : fdata,totalPages :totalPages,totalRecords : filteredData.length ,sortIndex: getIndex(
            filteredData,
            fdata,
            state.sortIndex,
            state.params
          ), }
          // return { ...state, filteredData }
        }

        case cmslivecasinoTypes:{
            return {
                ...state,types : action.data
            }
        }
        

        case cmslivecasinoSetProvider :{
            return {
                ...state,setprovider : action.data
            }
        }
        

        case cmslivecasinoSetType :{
            return {
                ...state,settype : action.data
            }
        }
        
        case cmslivecasinoProvider:{
            return {
                ...state,providerData : action.data,setprovider  :action.setprovider,moredata : action.moredata,
                deftypes : action.deftypes
            }
        }
      default:
        return state
    }
  }