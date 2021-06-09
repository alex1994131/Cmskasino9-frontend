import React, { Component } from "react"
import {UncontrolledDropdown,  DropdownMenu,  DropdownToggle,  DropdownItem,Input,Col,Row,Button,Modal,
  ModalHeader, ModalBody, ModalFooter,FormGroup,Label,Form,Badge} from "reactstrap"
import DataTable from "react-data-table-component"
import ReactPaginate from "react-paginate"
import { history } from "../../../history"
import { ChevronDown,  ChevronLeft,  ChevronRight,Edit,Plus,Edit2,Trash,ArrowUp,ArrowDown,Check,X} from "react-feather"
import { connect } from "react-redux"
import {getData,filterData,menusave,menuupdate,pagenationchange,menudelete,allrefreshGames} from "../../../redux/actions/gamesprovider/providers"
import Toggle from "react-toggle"
// import confirm from "reactstrap-confirm";
import Select from "react-select"
import {key_providers,money_option,value_options,moneys_option1,value_moneys1,providerconfig_key,selectedStyle,pagenation_set} from "../../../configs/providerconfig"
import {toast} from "react-toastify"
import MultiSelect from "react-multi-select-component";

// const GametypesComponent = props => {
//   return (
//     <div className="data-list-action">
//       <Button.Ripple className="round" outline  color="flat-success" onClick={()=>props.Gametypesview(props.row)} > <Edit2 size={14} /> View
//       </Button.Ripple>
//     </div>
//   )
// }

const ActionsComponent = props => {
  return (
    <div className="data-list-action">
      <Edit   className="cursor-pointer mr-1"  size={20}  onClick={()=>props.rowEdit(props.row)} />
      <Trash   className="cursor-pointer mr-1"  size={20}  onClick={()=>props.rowDelete(props.row,props.parsedFilter)} />
      <ArrowUp className="cursor-pointer mr-1" size={20} onClick={()=>props.rowArrowup(props.row)} />
      <ArrowDown className="cursor-pointer mr-1" size={20} onClick={()=>props.rowArrowDown(props.row)}/>
    </div>
  )
}


const CustomHeader = props => {
  return (
    <Row className="p-1">
    <Col xs="6" md="3">
      <UncontrolledDropdown className="data-list-rows-dropdown mt-1 d-block mb-1">
        <DropdownToggle color="" className="sort-dropdown">
          <span className="align-middle mx-50">
            {`${props.index[0] ? props.index[0] : 0} - ${props.index[1] ? props.index[1] : 0} of ${props.total}`}
          </span>
        <ChevronDown size={15} />
        </DropdownToggle>
        <DropdownMenu tag="div" right>
          {
            pagenation_set.map((item,i)=>(
              <DropdownItem tag="a" key={i} onClick={() => props.handleRowsPerPage(item)}>{item} </DropdownItem>
            ))
          }
        </DropdownMenu>
      </UncontrolledDropdown>
    </Col>
    <Col xs="6" md="2">
      <div className="filter-section mt-1">
        <Input type="text" className="border-white" onChange={e => props.handleFilter(e)} />
      </div>
    </Col>
    <Col xs="6" md="2" className="mt-1 text-right">
      <Button className="add-new-btn" color="primary" onClick={() => props.handleSidebar(true)} outline>
        <Plus size={15} />
        <span className="align-middle">Add New Provider</span>
      </Button>
    </Col>
    <Col xs="6" md="2" className="mt-1 text-right">
      <Button   className="add-new-btn" color="primary" outline>
        <span className="align-middle">Refresh</span>
      </Button>
    </Col>
    <Button.Ripple className="round"   color="flat-success" onClick={() => { return props.me.rows_all_done() }} >
        <Check size={14} />
        Done
      </Button.Ripple>
      <Button.Ripple className="round"   color="flat-danger" onClick={() => { return props.me.rows_all_reject() }} >
        <X size={14} /> reject
      </Button.Ripple>
  </Row>
  )
}

class Child extends Component {
  static getDerivedStateFromProps(props, state) {
    if ( props.dataList.data.length !== state.data.length || state.currentPage !== props.parsedFilter.page ) {
      return {
        data: props.dataList.data,
        allData: props.dataList.filteredData,
        totalPages: props.dataList.totalPages,
        currentPage: parseInt(props.parsedFilter.page) - 1,
        rowsPerPage: parseInt(props.parsedFilter.perPage),
        totalRecords: props.dataList.totalRecords,
        sortIndex: props.dataList.sortIndex
      }
    }
    return null;
  }

    state = {
      data: [],
      totalPages: 0,
      currentPage: 0,
      columns: [
        {
          name: "order",
          selector: "order",
          sortable: false,
          minWidth: "50px",
        },
        {
          name: "providerText ",
          selector: "text",
          sortable: false,
          minWidth: "100px",
        },{
          name: "LAUNCHURL ",
          selector: "LAUNCHURL",
          sortable: false,
          minWidth: "100px",
        },
        {
          name: "Agregator",
          selector: "Agregator",
          sortable: false,
          minWidth: "100px",
        },
        {
          name: "Revenu Type",
          selector: "Type",
          sortable: false,
          minWidth: "150px",
          cell: row => (
            <>     {value_options[row.Type]}
            </>
          )
        },
        {
          name: "Money",
          selector: "Money",
          sortable: false,
          minWidth: "50px",
          cell: row => (
            <> {row.Money} {`${value_moneys1[row.currency]}`} </>
          )
        },
        {
          name: "Percent",
          selector: "Percentage",
          sortable: false,
          minWidth: "100px",
          cell: row => (
            < > {`${row.Percentage + " %"}`}
            </>
          )
        },
       
        {
          name: "Route",
          selector: "Route",
          sortable: false,
          minWidth: "150px",
          cell: row => (
            <>       {row.Route ? "Direct" : "Aggregators"}
            </>
          )
        },
        {
          name: "Status",
          selector: "status",
          sortable: false,
          minWidth: "100px",
          cell: row => (
            <Badge color={ row.status ? "light-success" : "light-danger"} pill> {row.status ? "Enable" : "Disable"}
            </Badge>
          )
        },
        // {
        //   name: "GameTYPES",
        //   minWidth: "50",
        //   sortable: false,
        //   cell: row => (
        //     <GametypesComponent row={row} parsedFilter={this.props.parsedFilter} Gametypesview = {this.Gametypesview} me={this} />
        //   )
        // },
        {
          name: "Actions",
          minWidth: "50",
          sortable: false,
          cell: row => (
            <ActionsComponent row={row} getData={this.props.getData} parsedFilter={this.props.parsedFilter} rowEdit = {this.rowEdit} rowDelete = {this.props.menudelete} rowArrowup ={this.rowArrowup} rowArrowDown ={this.rowArrowDown} me={this} />
          )
        },
      ],
      allData: [],
      value: "",
      rowsPerPage: 10,
      sidebar: false,
      currentData: null,
      selected: [],
      totalRecords: 0,
      sortIndex: [],
      addNew: "",
      modal: false,
      provider : "",
      update : false,
      rowid : "",
      status : false,
      bool : [],
      tooltipOpen : false,
      Route : false,
      modal1 : false,
      typesArray  :[],
      selectedRow : {},
      selectRows : [],
      GameTypeId : "",
      GameTypeName : "",
      isValid : null,
      booloptions : key_providers,
      Money : "",
      Percentage : "",
      currency : "",
      ischecked : false,
      moneys_option : [],
      Type : "1",
      LAUNCHURL:"",
      text:"",
      Agregator : ""
    }

    componentDidMount(){
      this.props.getData(this.props.parsedFilter,this.props.bool)
    }

    handleFilter = e => {
      this.setState({ value: e.target.value })
      this.props.filterData(e.target.value)
    }

    handleRowsPerPage = value => {
      let { parsedFilter, pagenationchange } = this.props
      let page = parsedFilter.page !== undefined ? parsedFilter.page : 1
      history.push(`${history.location.pathname}?page=${page}&perPage=${value}`)
      this.setState({ rowsPerPage: value })
      pagenationchange({ page: page, perPage: value })
    }

    handlePagination = page => {
      let { parsedFilter, pagenationchange } = this.props
      let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 10
      let urlPrefix = history.location.pathname
      history.push( `${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}` )
      pagenationchange({ page: page.selected + 1, perPage: perPage })
      this.setState({ currentPage: page.selected })
    }

    toggleModal = () => {
      this.setState(prevState => ({
        modal: !prevState.modal,
        Route : false,
        bool  :[],
        provider : "",
        rowid : "",
        status : false,
        Money : "1",
        Percentage : "",
        update : false,
        currency : "",
        Type : "1",
        text : "",
        LAUNCHURL:'',
        Agregator : ""
      }))
    }

    rowArrowup(row){
      var alldata = this.me.props.dataList.allData;
      var min =  alldata[0].order;
      if(row.order === min){
        return;
      }else{
        var num = row.order;
        var first = {};
        var last = {};
        for(var i = 0 ; i < alldata.length ; i++){
          if(alldata[i].order === num){
            last = alldata[i];
            first = alldata[i-1];
            break;
          }
        }
        var temp = 0;
        temp = first.order;
        first.order = last.order;
        last.order = temp;
        this.me.props.menuupdate([first,last],this.me.props.parsedFilter);
      }
    }

    rowArrowDown(row){
      var alldata = this.me.props.dataList.allData;
      var max = alldata[alldata.length-1].order;
      if(row.order === max){
        return;
      }else{
        var num = row.order;
        var first = {};
        var last = {};
        for(var i = 0 ; i < alldata.length ; i++ ){
          if(alldata[i].order === num){
            last = alldata[i];
            first = alldata[i+1];
            break;
          }
        }
        var temp = 0;
        temp = first.order;
        first.order = last.order;
        last.order = temp;
        this.me.props.menuupdate([first,last],this.me.props.parsedFilter);
      }
    }


    handleSubmit = (e)=>{
      e.preventDefault();
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
      if(this.state.bool && this.state.bool.length > 0){
        var newbool = {};
        var bools = this.state.bool;
        for(var i = 0 ; i < bools.length ; i++ ){
          newbool[bools[i].value] = true;
        }
        if(!this.state.update){
          var num = this.props.dataList.allData.length;
          var count = 0;
          if(num > 0){
            count = this.props.dataList.allData[num-1].order + 1;
          }
          var row = {
            provider : this.state.provider,
            bool : newbool,
            order : count,
            status : this.state.status,
            Route : this.state.Route,
            Money : this.state.Money,
            Percentage : this.state.Percentage,
            currency : this.state.currency,
            Type : this.state.Type,
            LAUNCHURL : this.state.LAUNCHURL,
            text : this.state.text,
            Agregator :this.state.Agregator
          }
          this.props.menusave(row,this.props.parsedFilter)
        }else{
          var row2 = {
            _id  :this.state.rowid,
            bool : newbool,
            status : this.state.status,
            Route : this.state.Route,
            Money : this.state.Money,
            Percentage : this.state.Percentage,
            currency : this.state.currency,
            Type : this.state.Type,
            text : this.state.text,
            LAUNCHURL : this.state.LAUNCHURL,
            Agregator :this.state.Agregator
          }
          this.setState({value : ""});
          this.props.menuupdate([row2],this.props.parsedFilter);
        }
      }else{
        toast.error("Please select Revenue share Type");
      }
    }


    rows_all_done = () =>{
      var rows = this.state.selectRows;
      var news = [];
      for(var i in  rows){
        var row = Object.assign({},rows[i],{status : true});
        news.push(row);
      }
      this.props.menuupdate(news,this.props.parsedFilter);
    }


    rows_all_reject = () =>{
      var rows = this.state.selectRows;
      var news = [];
      for(var i in  rows){
        var row = Object.assign({},rows[i],{status : false});
        news.push(row);
      }
      this.props.menuupdate(news,this.props.parsedFilter);
    }


    rowEdit(row){
      var types = row.bool;
      var rows = [];
      for(var i in types ){
        rows.push({label : providerconfig_key[i],value : i});
      }
      this.me.setState({Type : row.Type,currency : row.currency,
        Money :row.Money ,Percentage : row.Percentage,
        modal : true,rowid : row._id,update : true,
        bool : rows,provider : row.provider,
        status : row.status,Route : row.Route,LAUNCHURL:row.LAUNCHURL,text : row.text,
        Agregator : row.Agregator
      });
    }

    handleSwitchChange = () => {
      this.setState({
        bool: !this.state.bool
      })
    }
    handleSwitchChangestatus = ()=>{
      this.setState({
        status: !this.state.status
      })
    }
    handleSwitchChangeRoute = () =>{
      this.setState({
        Route: !this.state.Route
      })
    }

    toggleTooltip = () => {
      this.setState({
        tooltipOpen: !this.state.tooltipOpen
      })
    }

    // Gametypesview = (row) =>{
    //   this.setState({typesArray : row.type,selectedRow : row})
    //   this.toggleModal1();
    // }

    // toggleModal1 = () =>{
    //   this.setState({ modal1 : !this.state.modal1, GameTypeName : "" })
    // }

    // gametypeDelete = async(item) =>{
    //   var result =  await confirm();
    //   if(result){
    //     var arr = this.state.selectedRow.type
    //     var index = arr.indexOf(item);
    //     if (index > -1) {
    //       arr.splice(index, 1);
    //       this.setState({typesArray : arr});
    //     }
    //     this.props.menuupdate([this.state.selectedRow],this.props.parsedFilter)
    //   }else{

    //   }
    // }

    // gametypeAdd = (e) =>{
    //   e.preventDefault()
    //   if (this.state.GameTypeName.length > 0) {
    //     this.setState({ isValid: true });
    //     var arr = this.state.selectedRow.type;
    //     if(!arr){
    //       var data = this.state.selectedRow;
    //       data['type'] = [this.state.GameTypeName];
    //       this.setState({selectedRow : data});
    //       this.setState({typesArray :[this.state.GameTypeName] });
    //     }else{
    //       arr.push(this.state.GameTypeName);
    //       this.setState({typesArray :arr});
    //     }
    //     this.props.menuupdate([this.state.selectedRow],this.props.parsedFilter)
    //   } else if (this.state.GameTypeName.length === 0) {
    //     this.setState({ isValid: false })
    //   }
    // }


  render() {
    let { columns,data,allData,totalPages,value,rowsPerPage,totalRecords,sortIndex} = this.state
    return (
      <div id="admindata_table" className={`data-list list-view`}>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal} className="modal-dialog-centered" >
          <Form onSubmit={this.handleSubmit}  action={history.location.pathname} >
            <ModalHeader toggle={this.toggleModal} className="bg-primary">
              Edit
            </ModalHeader>
            <ModalBody className="modal-dialog-centered  mt-1">
            <Row>
              <Col md="6" sm="12">
                <FormGroup className="form-label-group position-relative has-icon-left">  
                  <Input type="text" placeholder="PROVIDERID" value={this.state.provider} onChange={e => this.setState({ provider: e.target.value })} required />
                  <div className="form-control-position" >
                    <Edit2 size={15} />
                  </div>
                  <Label>PROVIDERID</Label>
                </FormGroup>
              </Col>
             
              <Col md="6" sm="12">
                <FormGroup className="form-label-group position-relative has-icon-left">  
                  <Input type="text" placeholder="PROVIDERTEXT" value={this.state.text} onChange={e => this.setState({ text: e.target.value })} required />
                  <div className="form-control-position" >
                    <Edit2 size={15} />
                  </div>
                  <Label>PROVIDERTEXT</Label>
                </FormGroup>
              </Col>

              <Col md="12" sm="12">
                <FormGroup className="form-label-group position-relative has-icon-left">  
                  <Input type="text" placeholder="Agregator" value={this.state.Agregator} onChange={e => this.setState({ Agregator: e.target.value })} required />
                  <div className="form-control-position" >
                    <Edit2 size={15} />
                  </div>
                  <Label>Agregator</Label>
                </FormGroup>
              </Col>

              
              <Col md="12" sm="12">
                <FormGroup className="form-label-group position-relative has-icon-left">  
                  <Input type="text" placeholder="LAUNCHURL ID" value={this.state.LAUNCHURL} onChange={e => this.setState({ LAUNCHURL: e.target.value })} required />
                  <div className="form-control-position" >
                    <Edit2 size={15} />
                  </div>
                  <Label>LAUNCHURL ID</Label>
                </FormGroup>
              </Col>
              <Col md="6" sm="12" className="mt-0">
                  <Label>Route</Label>
                  <label className="react-toggle-wrapper">
                    <Button.Ripple color="primary" onClick={this.handleSwitchChangeRoute} size="sm" >
                      {this.state.Route ? "Direct" : "Aggregators"}
                    </Button.Ripple>
                  </label>
              </Col>
              <Col md="6" sm="12" className="mt-0">
                <Label>STATUS</Label>
                <label className="react-toggle-wrapper">
                  <Toggle checked={this.state.status} onChange={this.handleSwitchChangestatus} name="controlledSwitch" value="yes"  />
                  <Button.Ripple color="primary" onClick={this.handleSwitchChangestatus} size="sm" >
                    {this.state.status ? "Enable" : "Disable"}
                  </Button.Ripple>
                </label>
              </Col>
              <Col md="12" sm="12" className="mt-1">
                <Label>GAME Type</Label>
                <MultiSelect options={this.state.booloptions} className="multi-select" classNamePrefix="select" selectAllLabel="ALL PROVIDER" hasSelectAll="All" shouldToggleOnHover={true} value={this.state.bool} focusSearchOnOpen={true} onChange={(e)=>this.setState({bool : e})} labelledBy={"Select Provider"} />
              </Col>            
              <Col md="12" sm="12" className="mt-1">
                <Label>Revenue share Type</Label>
                  <Select className="mt-0" classNamePrefix="select" options={money_option} value={money_option.find(obj => obj.value === this.state.Type)} onChange={e =>this.setState({Type : e.value}) } />
              </Col>
              <Col md="6" sm="12" className="mt-2">
                <FormGroup className="form-label-group position-relative has-icon-left">  
                    <Input type="number" placeholder="Money" value={this.state.Money} onChange={e => this.setState({ Money: e.target.value })} required />
                    <div className="form-control-position" >
                      <Edit2 size={15} />
                    </div>
                    <Label>Money</Label>
                </FormGroup>
              </Col>
              <Col md="6" sm="12" className="mt-0">
                  <Label>currency</Label>
                  <Select className="mt-0" classNamePrefix="select" options={moneys_option1} value={moneys_option1.find(obj => obj.value === this.state.currency)} onChange={e =>this.setState({currency : e.value}) } />
              </Col>
              <Col md="6" sm="12" className="mt-0">
                  <FormGroup className="form-label-group position-relative has-icon-left">  
                    <Input type="number" min={1} max={99} placeholder="Percentage" value={this.state.Percentage} onChange={e => this.setState({ Percentage: e.target.value })} required/>
                    <div className="form-control-position" >
                      <Edit2 size={15} />
                    </div>
                    <Label>Percentage</Label>
                  </FormGroup>
                </Col>
                <Col md="6" sm="12" className="mt-0">
                  <Label style={{fontSize:"20px"}}>%</Label>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
            {
              this.state.update ? <Button color="primary" type="submit">update</Button> : <Button color="primary" type="submit">Accept</Button>
            }
            </ModalFooter>
          </Form>
        </Modal>
        {/* <Modal isOpen={this.state.modal1} toggle={this.toggleModal1} className="modal-dialog-centered" >
          <ModalHeader toggle={this.toggleModal1} className="bg-primary"> GAMETYPES </ModalHeader>
          <ModalBody className="modal-dialog-centered  mt-1 d-block">
            <Form style={{width:"100%"}} onSubmit={this.gametypeAdd}>
              <Row>
                <Col md="8" sm="12">
                  <FormGroup >
                  <Label for="GameTypeId">GameTypeName</Label>
                    <Input type="text" onChange={e => this.setState({ GameTypeName: e.target.value })} value={this.state.GameTypeName} id="GameTypeName" name="GameTypeName" valid={this.state.isValid === true} invalid={this.state.isValid === false}/>
                    {this.state.isValid ? (
                        <span className="valid-tooltip">Good</span>
                      ) : this.state.isValid === false ? (
                        <span className="invalid-tooltip">
                          Please enter a GameTypeName
                        </span>
                      ) : (
                        ""
                    )}
                  </FormGroup>
                </Col>
                <Col md="4" sm="12">
                  <Button className="mr-1 mb-1 mt-2" color="flat-primary" onClick={this.gametypeAdd}>add</Button>
                </Col>
            </Row>
              </Form>
            <ListGroup style={{width:"100%"}} className="mt-1">
              {
                this.state.typesArray ? this.state.typesArray.length > 0 ? this.state.typesArray.map((item,i)=>(
                    <ListGroupItem key={i} className="d-flex justify-content-between align-items-center">
                      <span>{item}</span>
                      <Badge style={{cursor:"pointer"}} color="danger" pill onClick={()=>this.gametypeDelete(item)}>delete</Badge>
                    </ListGroupItem>
                )) : "" :""
              }
            </ListGroup>
          </ModalBody>
        </Modal> */}
        <DataTable
          columns={columns}
          data={value.length ? allData : data}
          pagination
          paginationServer
          paginationComponent={() => (
            <ReactPaginate
              previousLabel={<ChevronLeft size={15} />}
              nextLabel={<ChevronRight size={15} />}
              breakLabel="..."
              breakClassName="break-me"
              pageCount={totalPages}
              containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
              activeClassName="active"
              forcePage={ this.props.parsedFilter.page ? parseInt(this.props.parsedFilter.page - 1)     : 0 }
              onPageChange={page => this.handlePagination(page)}
            />
          )}
          noHeader
          responsive
          pointerOnHover
          selectableRows
          selectableRowsHighlight
          onSelectedRowsChange={data => this.setState({ selectRows: data.selectedRows }) }
          customStyles={selectedStyle}
          subHeader
          subHeaderComponent={
            <CustomHeader
              handleFilter={this.handleFilter}
              handleRowsPerPage={this.handleRowsPerPage}
              rowsPerPage={rowsPerPage}
              total={totalRecords}
              index={sortIndex}
              me={this}
              parsedFilter={this.props.parsedFilter}
              handleSidebar={this.toggleModal}
              allrefreshGames = {this.props.allrefreshGames}
            />
          }
          sortIcon={<ChevronDown />}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    dataList: state.gameproviders.providers
  }
}

export default connect(mapStateToProps, {getData,filterData,menusave,menuupdate,pagenationchange,menudelete,allrefreshGames})(Child)