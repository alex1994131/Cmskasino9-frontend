import React from "react"
import {
  Card,
  CardBody,
  Button,Col,
  CardHeader
} from "reactstrap"
import { AgGridReact } from "ag-grid-react"
import { ContextLayout } from "../../utility/context/Layout"
import {Trash2 ,Save} from "react-feather"
import "../../assets/scss/plugins/tables/_agGridStyleOverride.scss"
import * as FpMngAction from "../../redux/actions/CMS/firstpageMngAction"
import { connect } from "react-redux"

class AggridTable extends React.Component {
  state = {
    
    rowData: null,
    pageSize: 20,
    isVisible: true,
    reload: false,
    collapse: true,
    status: "Opened",
    role: "All",
    selectStatus: "All",
    verified: "All",
    department: "All",
    searchVal: "",
    paginationPageSize: 20,
    currenPageSize: "",
    getPageSize: "",
    defaultColDef: {
      sortable: false,
      editable: true,
      resizable: true,
      suppressMenu: true
    },
    columnDefs: [
        {
            headerName: "Header Text",
            field: "headertext",
            filter: true,
            width: 300
        },
        {
            headerName: "ContextText",
            field: "contenttext",
            filter: true,
            width: 500
        },
        {
            headerName: "Actions",
            field: "transactions",
            editable: false,
            width: 150,
            cellRendererFramework: params => {
                return (
                    <div className="actions cursor-pointer">
                    <Trash2
                        size={15}
                        onClick={() => {
                            this.deletetext(params)
                        }}
                    />
                     <Save
                        size={15}
                        onClick={() => {
                            this.savetext(params)
                        }}
                    />
                    </div>
                )
            }
        }
    ]
  }

    deletetext=(params)=>{
        this.props.deletetext(params);
    }
    savetext = (params)=>{
        this.props.savetext(params);
    }

    addtext = ()=>{
        var data=
        {
            headertext : "fff",
            contenttext : "sss",
            id : (new Date()).valueOf()
        }
    
        var outdada = [];
        if(this.state.rowData == null){
            this.setState({rowData :[data]})
        }else{
            outdada =  this.state.rowData;
            outdada.push(data);
            this.setState({rowData : outdada})
            this.props.addtext(outdada);
        }
    }

    componentDidMount() {
        this.props.loadtextdata();
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi
        this.setState({
            currenPageSize: this.gridApi.paginationGetCurrentPage() + 1,
            getPageSize: this.gridApi.paginationGetPageSize(),
            totalPages: this.gridApi.paginationGetTotalPages()
        })
    }

    updateSearchQuery = val => {
        this.gridApi.setQuickFilter(val)
    }

    filterSize = val => {
    if (this.gridApi) {
        this.gridApi.paginationSetPageSize(Number(val))
        this.setState({
        currenPageSize: val,
        getPageSize: val
        })
    }
    }

    updatedata(){
    }
    render() {

if(this.props.firstpagestext){
    this.state.rowData = this.props.firstpagestext
}else{

}
    const { rowData, columnDefs, defaultColDef } = this.state
    return (
      <React.Fragment>
        <Card className="overflow-hidden agGrid-card">
            <CardBody className="py-0">
            <CardHeader>
                <Col md="9">
                    <h4>Add Text</h4>
                </Col>
                <Col md="3">
                    <Button color="primary" className="mb-1" onClick={this.addtext}>add</Button>
                </Col>                       
            </CardHeader>
            {this.state.rowData === null ? null : (
              <div className="ag-theme-material w-100 my-2 ag-grid-table">
                 
                <ContextLayout.Consumer>
                  {context => (
                    <AgGridReact
                    updatedata={this.updatedata}
                      rowSelection="multiple"
                      defaultColDef={defaultColDef}
                      columnDefs={columnDefs}
                      rowData={rowData}
                      onGridReady={this.onGridReady}
                      colResizeDefault={"shift"}
                      animateRows={true}
                      floatingFilter={true}
                      pagination={true}
                      paginationPageSize={this.state.paginationPageSize}
                      pivotPanelShow="always"
                      enableRtl={context.state.direction === "rtl"}
                        rowData={rowData}
                        resizable={true}
                    />
                  )}
                </ContextLayout.Consumer>
              </div>
            )}
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}

const mapstop =(state)=>{
    return {
        firstpagestext : state.cms.fpMng.firstpagestext
    }
}
export default connect(mapstop,FpMngAction)(AggridTable)
