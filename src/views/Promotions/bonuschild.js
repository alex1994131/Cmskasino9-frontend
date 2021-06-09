import React, { Component } from "react"
import {  UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Input, Col, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Form, Badge } from "reactstrap"
import {  ChevronDown, ChevronLeft, ChevronRight, Trash, ArrowDown, ArrowUp, Edit, Plus, Link, Award, Edit2 } from "react-feather"
import {  getData, filterData, menusave, menuupdate, menudelete } from "../../redux/actions/promotions/Bonus/index"
import DataTable from "react-data-table-component"
import ReactPaginate from "react-paginate"
import { history } from "../../history"
import { connect } from "react-redux"
import Toggle from "react-toggle"
import Flatpickr from "react-flatpickr";
import {Bonus_types,selectedStyle,pagenation_set} from "../../configs/providerconfig"
import Select from "react-select"
import Moment from 'react-moment';
Moment.globalFormat = 'YYYY/MM/DD hh:mm:ss';

const ActionsComponent = props => {
  return (
    <div className="data-list-action">
        <ArrowUp
         className="cursor-pointer mr-1"
         size={20}
         onClick={()=>props.rowArrowup(props.row)}
        />
        <ArrowDown
         className="cursor-pointer mr-1"
         size={20}
         
         onClick={()=>props.rowArrowDown(props.row)}
        />
        <Edit 
         className="cursor-pointer mr-1"
         size={20}
         onClick={()=>props.rowEdit(props.row)}
        />
        <Trash
         className="cursor-pointer mr-1"
         size={20}
         onClick={()=>props.rowDelete(props.row,props.parsedFilter)}
        />

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
            <Button
                className="add-new-btn"
                color="primary"
                onClick={() => props.handleSidebar(true)}
                outline>
                <Plus size={15} />
                <span className="align-middle">Add New Bonus</span>
            </Button>
        </Col> 
    </Row>
  )
}

class Child extends Component {
    static getDerivedStateFromProps(props, state) {
        if (
            props.dataList.data.length !== state.data.length ||
            state.currentPage !== props.parsedFilter.page
        ) {
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
                minWidth: "120px",
                cell: row =>(
                    <span>{row.order+1}</span>
                )
            },
            {
                name: "bonusname",
                selector: "bonusname",
                sortable: false,
                minWidth: "120px",
            },
            {
                name: "TYPE",
                selector: "type",
                sortable: false,
                minWidth: "120px",
                cell: row =>(
                    <span>{Bonus_types[Bonus_types.findIndex(data => data.value === row.type)].label}</span>
                )
            },
            {
                name: "mindeposit",
                selector: "mindeposit",
                sortable: false,
                minWidth: "120px",
            },
            {
                name: "maxdeposit",
                selector: "maxdeposit",
                sortable: false,
                minWidth: "120px",
            },
            {
                name: "Wagering Req	",
                selector: "Wageringreq",
                sortable: false,
                minWidth: "100px",
            },
            {
                name: "Timetowager	",
                selector: "Timetowager",
                sortable: false,
                minWidth: "100px",
            },
            	
            {
                name: "Starting date",
                selector: "startdate",
                sortable: false,
                minWidth: "100px",
                cell : row => (
                    <div>
                        <Moment  date={(new Date(row.startdate))} />
                    </div>
                )
            },
            {
                name: "ending date",
                selector: "enddate",
                sortable: false,
                minWidth: "100px",
                cell : row => (
                    <div>
                        <Moment  date={(new Date(row.enddate))} />
                    </div>
                )
            },
            {
                name: "Description",
                selector: "description",
                sortable: false,
                minWidth: "100px",
            },
            {
                name: "Status",
                selector: "status",
                sortable: false,
                minWidth: "100px",
                cell: row => (
                    <Badge
                        color={ row.status ? "light-success" : "light-danger"}
                        pill>
                        {row.status ? "Enable" : "Disable"}
                    </Badge>
                )
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
                        rowArrowup ={this.rowArrowup}
                        rowArrowDown ={this.rowArrowDown}
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

        bonusname : "",
        maxdeposit : 0,
        mindeposit : 0,
        Wageringreq : 35,
        startdate : new Date(),
        enddate  :new Date(),
        type : Bonus_types[0].value,
        description : '',
        update : false,
        rowid : "",
        isChecked : false,
        tooltipOpen : false,
        Timetowager : ""
    }


    componentDidMount(){
      this.props.getData(this.props.parsedFilter)
    }

    handleFilter = e => {
      this.setState({ value: e.target.value })
      this.props.filterData(e.target.value)
    }

    handleRowsPerPage = value => {
        let { parsedFilter, getData } = this.props
        let page = parsedFilter.page !== undefined ? parsedFilter.page : 1
        history.push(`${history.location.pathname}?page=${page}&perPage=${value}`)
        this.setState({ rowsPerPage: value })
        getData({ page: page, perPage: value })
    }

    handlePagination = page => {
        let { parsedFilter, getData } = this.props
        let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 10
        let urlPrefix =  history.location.pathname
        history.push(`${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`)
        getData({ page: page.selected + 1, perPage: perPage })
        this.setState({ currentPage: page.selected })
    }

    toggleModal = () => {
      this.setState(prevState => ({
        modal: !prevState.modal,
        update : false,
       
        isChecked : false
      }))
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        this.setState(prevState => ({ modal: !prevState.modal }));
        if(!this.state.update){
            var num = this.props.dataList.allData.length;
            var count = 0;
            if(num > 0){
                count = this.props.dataList.allData[num-1].order + 1;
            }
            var row = {
                order : count,
                status : this.state.isChecked,
                bonusname : this.state.bonusname,
                type : this.state.type,
                maxdeposit : this.state.maxdeposit,
                mindeposit : this.state.mindeposit,
                Wageringreq : this.state.Wageringreq,
                startdate : this.state.startdate,
                description : this.state.description,
                enddate  :this.state.enddate,
                Timetowager : this.state.Timetowager
            }
            this.props.menusave(row,this.props.parsedFilter);
        }else{
            var row2 = {
                order : this.state.ordernum,
                _id  :this.state.rowid,
                status : this.state.isChecked,
                type : this.state.type,
                bonusname : this.state.bonusname,
                maxdeposit : this.state.maxdeposit,
                mindeposit : this.state.mindeposit,
                Wageringreq : this.state.Wageringreq,
                description : this.state.description,
                startdate : this.state.startdate,
                enddate  :this.state.enddate,
                Timetowager : this.state.Timetowager
            }
            this.props.menuupdate([row2],this.props.parsedFilter);
        }
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

    rowEdit(row){
      this.me.setState({modal : true,
            isChecked : row.status,
            rowid : row._id ,
            update : true,
            ordernum : row.order,
            type : row.type,
            bonusname : row.bonusname,
            maxdeposit : row.maxdeposit,
            mindeposit : row.mindeposit,
            Wageringreq : row.Wageringreq,
            startdate : row.startdate,
            enddate  :row.enddate,
            description  :row.description,
            Timetowager : row.Timetowager
        });
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

  render() {
    let {
      columns,
      data,
      allData,
      totalPages,
      value,
      rowsPerPage,
      totalRecords,
      sortIndex
    } = this.state
    return (
      <div id="admindata_table"
        className={`data-list list-view`}>          
        <Modal isOpen={this.state.modal} toggle={this.toggleModal} className="modal-dialog-centered" >
            <Form onSubmit={this.handleSubmit}  action={history.location.pathname} >
                <ModalHeader toggle={this.toggleModal} className="bg-primary">
                    ADD NEW BONUS
                </ModalHeader>
                <ModalBody className="modal-dialog-centered  mt-1">
                    <Row>
                        <Col md="12">
                            <FormGroup className="form-label-group position-relative has-icon-left">
                                <Select
                                    className="React"
                                    classNamePrefix="select"
                                    options={Bonus_types}
                                    value={Bonus_types.find(obj => obj.value===this.state.type)}
                                    defaultValue={Bonus_types[0]}
                                    onChange={e => this.setState({type : e.value})}
                                />
                                <div className="form-control-position" >
                                    <Edit2 size={15} />
                                </div>
                                <Label>Type</Label>
                            </FormGroup>
                        </Col>
                        <Col md="12">
                            <FormGroup className="form-label-group position-relative has-icon-left">
                                <Input
                                    type="text"
                                    placeholder="Bonus name"
                                    value={this.state.bonusname}
                                    onChange={e => this.setState({ bonusname: e.target.value })}
                                    required
                                />
                                <div className="form-control-position" >
                                    <Edit2 size={15} />
                                </div>
                                <Label>Bonus Name</Label>
                            </FormGroup>
                        </Col>
                        <Col md="12">
                            <FormGroup className="form-label-group position-relative has-icon-left">
                                <Flatpickr
                                    className="form-control"
                                    placeholder="Starting Date"
                                    value={this.state.startdate}
                                    onChange={date => { this.setState({ startdate : date[0] }); }}
                                    required
                                />
                                <div className="form-control-position" >
                                    <Edit2 size={15} />
                                </div>
                                <Label>starting Date</Label>
                            </FormGroup>
                        </Col>
                        <Col md="12">
                            <FormGroup className="form-label-group position-relative has-icon-left">
                                <Flatpickr
                                    className="form-control"
                                    placeholder="Ending Date"
                                    value={this.state.enddate}
                                    onChange={date => { this.setState({ enddate : date[0] }); }}
                                    required
                                />
                                <div className="form-control-position" >
                                    <Edit2 size={15} />
                                </div>
                                <Label>Ending deposit</Label>
                            </FormGroup>
                        </Col>
                        
                        <Col md="12">
                            <FormGroup className="form-label-group position-relative has-icon-left">
                                <Input
                                    type="number"
                                    placeholder="min deposit"
                                    value={this.state.mindeposit}
                                    onChange={e => this.setState({ mindeposit: e.target.value })}
                                    required
                                />
                                <div className="form-control-position" >
                                    <Edit2 size={15} />
                                </div>
                                <Label>min deposit</Label>
                            </FormGroup>
                        </Col>

                        <Col md="12">
                            <FormGroup className="form-label-group position-relative has-icon-left">
                                <Input
                                    type="number"
                                    placeholder="maxdeposit"
                                    value={this.state.maxdeposit}
                                    onChange={e => this.setState({ maxdeposit: e.target.value })}
                                    required
                                />
                                <div className="form-control-position" >
                                    <Link size={15} />
                                </div>
                                <Label>max deposit</Label>
                            </FormGroup>
                        </Col>
                        <Col md="12">
                            <FormGroup className="form-label-group position-relative has-icon-left">
                                <Input
                                    type="number"
                                    placeholder="Wagering requirement"
                                    value={this.state.Wageringreq}
                                    onChange={e => this.setState({ Wageringreq: e.target.value })}
                                    required
                                />
                                <div className="form-control-position" >
                                <Award size={15} />
                                </div>
                                <Label>Wageringreq</Label>
                            </FormGroup>
                        </Col>
                        
                        <Col md="12">
                            <FormGroup className="form-label-group position-relative has-icon-left">
                                <Input
                                    type="number"
                                    placeholder="Time to wager"
                                    value={this.state.Timetowager}
                                    onChange={e => this.setState({ Timetowager: e.target.value })}
                                    required
                                />
                                <div className="form-control-position" >
                                <Award size={15} />
                                </div>
                                <Label>Timetowager</Label>
                            </FormGroup>
                        </Col>

                        <Col md="12">
                            <FormGroup className="form-label-group position-relative has-icon-left">
                                <Input 
                                    type="textarea" 
                                    value={this.state.description}
                                    onChange={e => this.setState({ description: e.target.value })}
                                    placeholder="Description"
                                    required
                                />
                                <div className="form-control-position" >
                                    <Award size={15} />
                                </div>
                                <Label>Description</Label>
                            </FormGroup>
                        </Col>

                        <Col md="12">
                            <label className="react-toggle-wrapper">
                            <Toggle
                                checked={this.state.isChecked}
                                onChange={this.handleSwitchChange}
                                name="controlledSwitch"
                                value="yes"
                            />
                            <Button.Ripple
                                color="primary"
                                onClick={this.handleSwitchChange}
                                size="sm"
                            >
                                {this.state.isChecked ? "Enable" : "Diable"}
                            </Button.Ripple>
                            </label>
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
                    forcePage={
                        this.props.parsedFilter.page
                        ? parseInt(this.props.parsedFilter.page - 1)
                        : 0
                    }
                    onPageChange={page => this.handlePagination(page)}
                />
            )}
          noHeader
          subHeader
          responsive
          pointerOnHover
          selectableRowsHighlight
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
    dataList: state.promotions.BonusMenu
  }
}

export default connect(mapStateToProps, {
    getData,
    filterData,
    menusave,
    menuupdate,
    menudelete
})(Child)