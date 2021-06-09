import React, { Component } from "react"
import {  UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Input, Col, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Form } from "reactstrap"
import {  ChevronDown, ChevronLeft, ChevronRight, Plus } from "react-feather"
import {  getData, filterData, menusave, menuupdate, menudelete,pagenationchange,allresult,todayresult ,revenushow} from "../../../redux/actions/matka/result"
import DataTable from "react-data-table-component"
import ReactPaginate from "react-paginate"
import { history } from "../../../history"
import { connect } from "react-redux"
import {selectedStyle,pagenation_set} from "../../../configs/providerconfig"
import Select from "react-select"
import Flatpickr from "react-flatpickr";

const ActionsComponent = props => {
  return (
    <div className="data-list-action">
      {
        !props.row.update ?
        <Button  color="primary" outline onClick={()=>props.rowEdit(props.row)}>
          Rollback
        </Button> : <Button disabled={true}  color="primary" outline>
          Rollback
        </Button> 
      }
      {/* <Trash className="cursor-pointer mr-1" size={20} onClick={()=>props.rowDelete(props.row,props.parsedFilter,props.me.state.date)} /> */}
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
      <Col xs="6" md="2" className="mt-1 text-right">
        <Button className="add-new-btn" color="primary" onClick={() => props.handleSidebar(true)} outline>
          <Plus size={15} />
          <span className="align-middle">Add New</span>
        </Button>
      </Col>
      <Col xs="6" md="2" className="mt-1 text-right">
        <Button className="add-new-btn" color="primary" onClick={() => props.allresult(true)} outline>
          <Plus size={15} />
          <span className="align-middle">All Result</span>
        </Button>
      </Col>
      <Col xs="6" md="2" className="mt-1 text-right">
        <Button className="add-new-btn" color="primary" onClick={() => props.todayresult(true)} outline>
          <Plus size={15} />
          <span className="align-middle">Today Result</span>
        </Button>
      </Col>
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
          name: "resultdate",
          selector: "resultdate",
          sortable: false,
          minWidth: "220px",
        },
        {
            name: "bazaar",
            selector: "bazaarid",
            sortable: false,
            minWidth: "100px",
            cell :  (row) =>(
                <div>
                    {
                       this.props.dataList.bazaarlist && this.props.dataList.bazaarlist.length > 0 ? this.props.dataList.bazaarlist.find(obj=> obj._id === row.bazaarid).bazaarname : null
                    }
                </div>
            )
          },        
       
          {
            name: "openresult",
            selector: "openresult",
            sortable: false,
            minWidth: "100px",
          },
          {
            name: "jodiresult",
            selector: "jodiresult",
            sortable: false,
            minWidth: "100px",
          },
          {
            name: "closeresult",
            selector: "closeresult",
            sortable: false,
            minWidth: "100px",
          },
        {
          name: "Actions",
          minWidth: "50",
          sortable: false,
          cell: row => (
            <ActionsComponent
              row={row}
              getData={this.props.getData}
              parsedFilter={this.props.parsedFilter}
              rowEdit = {this.rowEdit}
              rowDelete={this.props.menudelete}
              me={this}
            />
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
      update : false,
      rowid : "",
      bazaarid : "",
      resultdate : [new Date()],
      date : {
        start:new Date(),
        end: new Date(new Date().valueOf()+ (24 * 60 * 60 * 1000)),
        },
        openresult : "",
        closeresult : "",
        jodiresult : "",
        resultshow : null
    }

    componentDidMount(){
      this.props.getData(this.props.parsedFilter,this.state.date)
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
      pagenationchange({ page: page, perPage: value },this.props.bool)
    }

    handlePagination = page => {
      let { parsedFilter, pagenationchange } = this.props
      let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 10
      let urlPrefix = history.location.pathname
      history.push( `${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}` )
      pagenationchange({ page: page.selected + 1, perPage: perPage },this.props.bool)
      this.setState({ currentPage: page.selected })
    }

    toggleModal = () => {
      this.setState(prevState => ({
        modal: !prevState.modal,
        update : false,
      }))
    }

    revenu_show = async () =>{
      if( this.state.openresult.length > 0 &&this.state.closeresult.length > 0 && this.state.jodiresult.length >0){
        let user = this.props.user;
        var row = Object.assign({},{createdby : user._id},{resultdate : this.state.resultdate[0].toDateString()},{bazaarid :this.state.bazaarid},{openresult : this.state.openresult},{closeresult :this.state.closeresult},{jodiresult:this.state.jodiresult});
        var dd = await this.props.revenushow(row,this.props.parsedFilter,this.state.date);
        this.setState({resultshow : dd});
       }
    }

    handleSubmit = async (e)=>{
        e.preventDefault();
        if( this.state.openresult.length > 0 &&this.state.closeresult.length > 0 && this.state.jodiresult.length >0){
          this.setState(prevState => ({
              modal: !prevState.modal
          }));
          let user = this.props.user;
          if(!this.state.update){
            var row = Object.assign({},{createdby : user._id},{resultdate : this.state.resultdate[0].toDateString()},{bazaarid :this.state.bazaarid},{openresult : this.state.openresult},{closeresult :this.state.closeresult},{jodiresult:this.state.jodiresult});
           var dd = await this.props.menusave(row,this.props.parsedFilter,this.state.date);
           console.log(dd);
          this.setState({resultshow : dd});
          }else{
            row = Object.assign({},{createdby : user._id},{resultdate : this.state.resultdate[0].toDateString()},{_id  :this.state.rowid},{bazaarid :this.state.bazaarid},{openresult : this.state.openresult},{closeresult :this.state.closeresult},{jodiresult:this.state.jodiresult});
            this.props.menuupdate(row,this.props.parsedFilter,this.state.date);
          }
        }
    }

    rowEdit(row){
      this.me.setState({resultdate :[ new Date(row.DATE)],bazaarid : row.bazaarid,modal : true,rowid : row._id,update : true,openresult : row.openresult,closeresult : row.closeresult,jodiresult : row.jodiresult});
    }

    handleSwitchChange = () => {
      this.setState({
        isChecked: !this.state.isChecked
      })
    }

    toggleTooltip = () => {
      this.setState({
        tooltipOpen: !this.state.tooltipOpen
      })
    }

    Change_result = (number,bool) =>{
        if(number){
          if(number.length > 3){

          }else{
            if(bool){
                if(number.length === 3){
                    let mod =( parseInt(number[0]) + parseInt(number[1]) + parseInt(number[2]) )%10       
                    let num = this.state.jodiresult;
                    if(num && num.length > 1){
                        num =  mod + num[1];
                    }else{
                        num = mod + "";
                    }
                    this.setState({openresult : number,jodiresult : num})
                }else{
                    this.setState({openresult : number})
                }
            }else{
                if(number.length === 3){
                    let mod =( parseInt(number[0]) + parseInt(number[1]) + parseInt(number[2]) )%10       
                    let num = this.state.jodiresult;
                    if(num && num.length > 0){
                        num =   num[0] + mod;
                    }
                    this.setState({closeresult : number,jodiresult : num})

                }else{
                    this.setState({closeresult : number})
                }
            }
          }
        }
    }
  
    render() {
      let { columns, data, allData,totalPages, value, rowsPerPage, totalRecords, sortIndex } = this.state;
      let {bazaarlist} = this.props.dataList;
      let bazaarlist_options = [];
      for( let i in bazaarlist){
        bazaarlist_options.push({value:bazaarlist[i]._id,label :bazaarlist[i].bazaarname });
      }
      return (
        <div  id="admindata_table"  className={`data-list list-view`}>
            <Modal isOpen={this.state.modal} toggle={this.toggleModal} className="modal-dialog-centered" >
                <Form onSubmit={this.handleSubmit}  action={history.location.pathname} >
                    <ModalHeader toggle={this.toggleModal} className="bg-primary">
                        Create Result
                    </ModalHeader>
                    <ModalBody className="modal-dialog-centered mt-1 d-block">
                        <Row>
                            <Col md='12'>
                                <Label for="select Bazaar">Bazaar Date</Label>
                                <Flatpickr  className="form-control" value={this.state.resultdate}
                                    onChange={date => { this.setState({ resultdate : date }); }} />
                            </Col>
                            <Col md='12'>
                                <Label for="select Bazaar">Bazaar</Label>
                                <Select className="React" classNamePrefix="select"  name="select Bazaar" options={bazaarlist_options}
                                    value={bazaarlist_options.find(obj => obj.value === this.state.bazaarid)} onChange={e => this.setState({ bazaarid: e.value })} />
                            </Col>
                            <Col md="12" className="mt-1">
                                <Row>
                                    <Col md="3">
                                        <Label>open result</Label>
                                        <Input type="number" placeholder="Open Result" value={this.state.openresult}
                                        onChange={e => this.Change_result(e.target.value,true)} required />
                                    </Col>
                                    <Col md="2">
                                        <Label>jodi</Label>
                                        <Input type="number" placeholder="Jodi" value={this.state.jodiresult}
                                        onChange={e => this.setState({ jodiresult: e.target.value })} required />
                                    </Col>
                                    <Col md="3">
                                        <Label>close result</Label>
                                        <Input type="number" placeholder="Close Result" value={this.state.closeresult}
                                        onChange={e => this.Change_result(e.target.value,false)} required />
                                    </Col>
                                    {/* <Col md="3" className="mt-1">
                                      <Button color="primary" type="button" onClick={()=>this.revenu_show()}>Revenue Show</Button>
                                    </Col> */}
                                </Row>
                            </Col>
                            {/* {
                              this.state.resultshow?
                              <React.Fragment>
                                <Col md="12" className="mt-1">
                                  <h3 className="text-center">
                                    For Players !
                                  </h3>
                                  <Row>
                                    <Col md="4">
                                      <Label>totalbet</Label>
                                      <div className="color-white text-center">{this.state.resultshow.totalbet} </div>
                                    </Col>
                                    <Col md="4">
                                      <Label>platform profit</Label>
                                        <div className="color-white text-center">{this.state.resultshow.totalloose} </div>
                                    </Col>
                                    <Col md="4">
                                      <Label>player profit</Label>
                                        <div className="color-white text-center">{this.state.resultshow.totalwin} </div>
                                    </Col>
                                  </Row>                                
                                </Col>
                              </React.Fragment>
                              : null
                            } */}

                        </Row>
                        
                        
                    </ModalBody>
                    <ModalFooter>
                      {
                        this.state.update ? <Button color="primary" type="submit">update</Button> : <Button color="primary" type="submit">Accept</Button>
                      }

                    </ModalFooter>
                </Form>
            </Modal>
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
                    forcePage={ this.props.parsedFilter.page ? parseInt(this.props.parsedFilter.page - 1) : 0 }
                    onPageChange={page => this.handlePagination(page)}
                    />
                )}
                noHeader
                subHeader
                responsive
                pointerOnHover
                selectableRowsHighlight
                onSelectedRowsChange={data => this.setState({ selected: data.selectedRows }) }
                customStyles={selectedStyle}
                subHeaderComponent={
                    <CustomHeader
                    handleFilter={this.handleFilter}
                    handleRowsPerPage={this.handleRowsPerPage}
                    rowsPerPage={rowsPerPage}
                    total={totalRecords}
                    index={sortIndex}
                    parsedFilter={this.props.parsedFilter}
                    handleSidebar={this.toggleModal}
                    allresult={this.props.allresult}
                    todayresult={this.props.todayresult}
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
    dataList: state.matka.Result,
    user : state.auth.login.values
  }
}

export default connect(mapStateToProps, {getData,filterData,menusave,menuupdate,menudelete,pagenationchange,allresult,todayresult,revenushow})(Child)