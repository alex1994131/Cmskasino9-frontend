import React, { Component } from "react"
import {  UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem,CustomInput, Input, Col, Row, Button, Modal,Table, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Form, Badge } from "reactstrap"
import {  ChevronDown, ChevronLeft, ChevronRight, Trash, Edit, Plus, Edit2 ,Link } from "react-feather"
import {  getData, filterData, menusave, menuupdate, menudelete,pagenationchange,gamelink_save } from "../../../redux/actions/matka/bazaars"
import DataTable from "react-data-table-component"
import ReactPaginate from "react-paginate"
import { history } from "../../../history"
import { connect } from "react-redux"
import Toggle from "react-toggle"
import {selectedStyle,pagenation_set,bazaartype,postCalled,postCalled1,postCalled2,ownerShip,postCalled3} from "../../../configs/providerconfig"
import Select from "react-select"
import Flatpickr from "react-flatpickr";
import {toast} from "react-toastify"
import {get_timestring} from "../../../redux/actions/auth/index"

const ActionsComponent = props => {
  return (
    <div className="data-list-action">
      <Edit  className="cursor-pointer mr-1" size={20} onClick={()=>props.rowEdit(props.row)} />
      <Trash className="cursor-pointer mr-1" size={20} onClick={()=>props.rowDelete(props.row,props.parsedFilter)} />
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
          <span className="align-middle">Add New</span>
        </Button>
    </Col>
  </Row>
  )
}

class Child extends Component {
    static getDerivedStateFromProps(props, state) {
        if ( props.dataList.data.length !== state.data.length || state.currentPage !== props.parsedFilter.page) {
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
            name: "Bazaar Name",
            selector: "bazaarname",
            sortable: false,
            minWidth: "220px",
            cell : row =>(
                <div className="font-weight-bold">
                    {row.bazaarname}
                </div>
            )
          },
          {
            name: "Bazaar Type",
            selector: "bazaartype",
            sortable: false,
            minWidth: "100px",
            cell : row =>(
                <div>
                    {bazaartype.find(obj => obj.value === row.bazaartype) ? bazaartype.find(obj => obj.value === row.bazaartype).label : ""  }
                </div>
            )
          },
          {
            name: "Ownership",
            selector: "ownership",
            sortable: false,
            minWidth: "100px",
            cell : row => (
                <div >
                    {ownerShip.find(obj => obj.value === row.ownership) ? ownerShip.find(obj => obj.value === row.ownership).label : ""  }
                </div>
            )
          },
          {
            name: "postCalled",
            selector: "postCalled",
            sortable: false,
            minWidth: "100px",
            cell : row => (
                <div >
                    {postCalled3.find(obj => obj.value === row.postCalled) ? postCalled3.find(obj => obj.value === row.postCalled).label : ""  }
                </div>
            )
          },
          {
            name: "Status",
            selector: "status",
            sortable: false,
            minWidth: "20px",
            cell: row => (
                <Badge color={ row.status ? "light-success" : "light-danger"}pill>
                  {row.status ? "Enable" : "Disable"}
                </Badge>
              )
          },
          {
            name: "Game Link",
            selector: "gamelink",
            sortable: false,
            minWidth: "20px",
            cell : row =>(
                <div>
                    <Link  className="cursor-pointer mr-1" onClick={()=>this.gamelink_edit(row)} size={20} />
                </div>
            )
          },
          {
            name: "Action",
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
        bazaarname : "",
        bazaartype : bazaartype[0].value,
        postCalled : postCalled[0].value,
        ownership  :ownerShip[0].value,
        update : false,
        rowid : "",
        isChecked : false,
        tooltipOpen : false,
        timers  : null,
        gamemodal : false,
        gamelinklist : [],
        selecteditem : {}
    }

    componentDidMount(){
      this.props.getData(this.props.parsedFilter)
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
        update : false,
        bazaarname : "",
        bazaartype : bazaartype[0].value,
        postCalled : postCalled[0].value,
        isChecked : false,
        ownership : ownerShip[0].value
      }))
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        this.setState(prevState => ({ modal: !prevState.modal }));
        if(!this.state.update){
            if (this.state.timers.length === 0){
                toast.warn("please add timers")
                return;              
            }
            var row = {
                bazaarname : this.state.bazaarname,
                bazaartype : this.state.bazaartype,
                ownership : this.state.ownership,
                status : this.state.isChecked,
                postCalled : this.state.postCalled,
                timers : this.state.timers
            }
            this.props.menusave(row,this.props.parsedFilter)
        }else{
            var row2 = {
                _id  :this.state.rowid,
                status : this.state.isChecked,
                bazaarname : this.state.bazaarname,
                bazaartype : this.state.bazaartype,
                ownership : this.state.ownership,
                postCalled : this.state.postCalled,
                timers : this.state.timers
            }
            this.props.menuupdate(row2,this.props.parsedFilter);
        }
    }

    rowEdit(row){
      this.me.setState({modal : true,rowid : row._id,update : true, isChecked : row.status,bazaarname : row.bazaarname,
        bazaartype : row.bazaartype,ownership : row.ownership, postCalled : row.postCalled, timers  : row.timers });
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

    opentimeadd = () =>{
        let opens = this.state.timers;
        switch(this.state.postCalled){
            case "1" :
                opens.push({ opentime : this.state.opentime});
                break;
            case "2" :
                opens.push({ closetime :this.state.closetime});
                break;
            case "3" :
                opens.push({ closetime :this.state.closetime,opentime : this.state.opentime});
                break;
            case "4" :
                opens.push({ closetime :this.state.closetime,opentime : this.state.opentime,interval : this.state.interval});
                break;    
            default : 
                break                            
        }
        this.setState({timers : opens});
    }

    delete = (item) =>{
        let arr = this.state.timers;
        let index = arr.indexOf(item);
        if (index > -1) {
            arr.splice(index, 1);
            this.setState({timers : arr});
        }
    }

    gamelink_edit = (item) =>{
        this.gametoggleModal();
        var gameslinkobj = item.gamelink;
        var games = [];
        var rows = [];
        console.log(item);
        switch(item.bazaartype){
            case "1" :
            games = this.props.dataList.gamelist.slice(0,7);
            break; 
            case "2" :
            games.push(this.props.dataList.gamelist[1]);
            games.push(this.props.dataList.gamelist[7]);
            games.push(this.props.dataList.gamelist[8]);
            break; 
            case "3" :
            games.push(this.props.dataList.gamelist[0]);
            games.push(this.props.dataList.gamelist[2]);
            games.push(this.props.dataList.gamelist[3]);
            games.push(this.props.dataList.gamelist[4]);
        
            break; 
            default : 
            break;
        } 

        console.log(games)

        for(var i in games){
            var minbetprice = 0;
            var oddsprice = 0;
            var minwin = 0;
            var status = false;
            if (gameslinkobj){
                minbetprice = gameslinkobj[games[i]._id] && gameslinkobj[games[i]._id].minbetprice ? gameslinkobj[games[i]._id].minbetprice : 0 ;
                oddsprice = gameslinkobj[games[i]._id] &&  gameslinkobj[games[i]._id].oddsprice ? gameslinkobj[games[i]._id].oddsprice : 0 ;
                status = gameslinkobj[games[i]._id] &&  gameslinkobj[games[i]._id].status ? gameslinkobj[games[i]._id].status : false;
                minwin = minbetprice * oddsprice;
            }
            var row = Object.assign({},{status : status},{gamename : games[i].name},{oddsprice : oddsprice},{minwin : minwin},{minbetprice : minbetprice},{ id : games[i]._id});
            rows.push(row);
        }
        this.setState({gamelinklist : rows,selecteditem : item})
    }

    gametoggleModal = () =>{
        this.setState({gamemodal : !this.state.gamemodal})
    }

    gamelinkhandleSubmit = (e) =>{
        e.preventDefault();
        var row = {};
        for(var i in this.state.gamelinklist){
            // if (this.state.gamelinklist[i].minbetprice && this.state.gamelinklist[i].oddsprice && this.state.gamelinklist[i].oddsprice !== "0" && this.state.gamelinklist[i].minbetprice !== "0"  ){
                row[this.state.gamelinklist[i].id] = {
                    minbetprice : this.state.gamelinklist[i].minbetprice,
                    oddsprice : this.state.gamelinklist[i].oddsprice,
                    status :  this.state.gamelinklist[i].status
                }
            // }
        }
        var item = Object.assign({},{_id : this.state.selecteditem._id},{gamelink : row});
        this.gametoggleModal();
        console.log(item)
        this.props.gamelink_save(item,this.props.parsedFilter);
    }

    gamesbetprice_change = (value,index,type) =>{
        var item =  this.state.gamelinklist;
        if(type === "status"){
            item[index][type] = !item[index][type];
        }else{
            item[index][type] = value;
        }
        console.log(item[index][type])
        this.setState({gamelinklist:item})
    }

    timerchange = (bool,value) =>{
        var timer = this.state.timers;
        console.log(value)
        if(!timer){
            timer = {};
            timer[bool] = value;
        }else{
            timer[bool] = value;
        }
        this.setState({timers : timer})
    }
    
    bazaartypechange = (e) =>{
        if(e === "1"){
            this.setState({postCalled : "1",bazaartype : e})
        }else if (e === "2"){
            this.setState({postCalled : "1",bazaartype : e})
        }else{
            this.setState({postCalled : "4",bazaartype : e})
        }
    }

    render() {
    let { columns, data, allData,totalPages, value, rowsPerPage, totalRecords, sortIndex } = this.state
    return (
      <div  id="admindata_table"  className={`data-list list-view`}>
         <Modal isOpen={this.state.modal} toggle={this.toggleModal} className="modal-dialog-centered modal-lg" >
            <Form onSubmit={this.handleSubmit}  action="#" >
                <ModalHeader toggle={this.toggleModal} className="bg-primary">
                    Add Bazaar
                </ModalHeader>
                <ModalBody className="modal-dialog-centered   mt-1">
                    <Row>
                        <Col md="12">
                            <FormGroup className="form-label-group position-relative has-icon-left">
                                <Input type="text" placeholder="bazaarname" value={this.state.bazaarname}
                                    onChange={e => this.setState({ bazaarname: e.target.value })} required />
                                <div className="form-control-position" >
                                    <Edit2 size={15} />
                                </div>
                                <Label>bazaarname</Label>
                            </FormGroup>
                        </Col>

                        <Col md="12">
                            <FormGroup>
                                <Label for="gender">bazaartype</Label>
                                <Select
                                    className="React" classNamePrefix="select" id="bazaartype" name="bazaartype"
                                    options={bazaartype} value={bazaartype.find(obj => obj.value === this.state.bazaartype)}
                                    defaultValue={bazaartype[0]} onChange={e => this.bazaartypechange(e.value )} />
                            </FormGroup>
                        </Col>

                        <Col md="12">
                            <FormGroup>
                                <Label for="gender">Check for Ownership </Label>
                                <Select
                                    className="React" classNamePrefix="select" id="ownerShip" name="ownerShip"
                                    options={ownerShip} value={ownerShip.find(obj => obj.value === this.state.ownerShip)}
                                    defaultValue={ownerShip[0]} onChange={e => this.setState({ ownerShip: e.value })} />
                            </FormGroup>
                        </Col>

                        <Col md="12">
                            <label className="react-toggle-wrapper">
                                <Toggle checked={this.state.isChecked}  onChange={this.handleSwitchChange} name="controlledSwitch" value="yes" />
                                <Button.Ripple color="primary" onClick={this.handleSwitchChange} size="sm" >
                                {this.state.isChecked ? "Enable" : "Diable"}
                                </Button.Ripple>
                            </label>
                        </Col>
                    
                        <Col md="12">
                            <FormGroup>
                                <Label for="gender">postCalled</Label>
                                {
                                    this.state.bazaartype === "1" ? 
                                        <Select
                                            className="React" classNamePrefix="select" id="postCalled" name="postCalled"
                                            options={postCalled} value={postCalled.find(obj => obj.value === this.state.postCalled)}
                                        defaultValue={postCalled[0]} onChange={e => this.setState({ postCalled: e.value  })} />
                                    : this.state.bazaartype === "2" ? 
                                        <Select
                                            className="React" classNamePrefix="select" id="postCalled" name="postCalled"
                                            options={postCalled1} value={postCalled1.find(obj => obj.value === this.state.postCalled)}
                                        defaultValue={postCalled1[0]} onChange={e => this.setState({ postCalled: e.value })} />
                                    : this.state.bazaartype === "3" ? 
                                        <Select
                                            className="React" classNamePrefix="select" id="postCalled" name="postCalled"
                                            options={postCalled2} value={postCalled2.find(obj => obj.value === this.state.postCalled)}
                                        defaultValue={postCalled2[0]} onChange={e => this.setState({ postCalled: e.value })} />
                                    : null
                                }
                            </FormGroup>
                        </Col>

                        <Col md="12">
                            <Row>
                                {   
                                    this.state.postCalled === "1" ?  
                                        <Col md="10" sm="12">
                                            <FormGroup >
                                                <Label for="opentime">opentime</Label>
                                                    <Flatpickr className="form-control" value={this.state.timers ?  this.state.timers.opentime : ""}
                                                        options={{ enableTime: true, noCalendar: true, dateFormat: "H:i",}}
                                                        onChange={date => { this.timerchange("opentime",  get_timestring(date[0])); }}
                                                    />
                                            </FormGroup>
                                        </Col> : 
                                    this.state.postCalled === "2" ? 
                                        <Col md="10" sm="12">
                                            <FormGroup >
                                            <Label for="opentime">closetime</Label>
                                            <Flatpickr className="form-control" value={ this.state.timers ? this.state.timers.closetime : ""}
                                                    options={{ enableTime: true, noCalendar: true, dateFormat: "H:i",}}
                                                    onChange={date => { this.timerchange("closetime",  get_timestring(date[0])); }}
                                                    />                                        </FormGroup>
                                        </Col> : 
                                    this.state.postCalled === "3" ? 
                                        <>
                                            <Col md="5" sm="12">
                                                <FormGroup >
                                                <Label for="opentime">opentime</Label>
                                                <Flatpickr className="form-control" value={ this.state.timers ? this.state.timers.opentime : ""}
                                                    options={{ enableTime: true, noCalendar: true, dateFormat: "H:i",}}
                                                    onChange={date => { this.timerchange("opentime",  get_timestring(date[0])); }}
                                                    />                                            </FormGroup>
                                            </Col>
                                            <Col md="5" sm="12">
                                                <FormGroup >
                                                <Label for="opentime">closetime</Label>
                                                <Flatpickr className="form-control" value={this.state.timers ?this.state.timers.closetime : ""}
                                                    options={{ enableTime: true, noCalendar: true, dateFormat: "H:i",}}
                                                    onChange={date => { this.timerchange("closetime",  get_timestring(date[0])); }}
                                                />                                            </FormGroup>
                                            </Col>
                                        </> : 
                                    this.state.postCalled === "4" ?
                                        <>
                                            <Col md="3" sm="12">
                                                <FormGroup >
                                                <Label for="opentime">opentime</Label>
                                                <Flatpickr className="form-control" value={this.state.timers ?this.state.timers.opentime :""}
                                                    options={{ enableTime: true, noCalendar: true, dateFormat: "H:i",}}
                                                    onChange={date => { this.timerchange("opentime",  get_timestring(date[0])); }}
                                                    />                                            </FormGroup>
                                            </Col>
                                            <Col md="3" sm="12">
                                                <FormGroup >
                                                <Label for="opentime">closetime</Label>
                                                <Flatpickr className="form-control" value={this.state.timers ?this.state.timers.closetime : ""}
                                                    options={{ enableTime: true, noCalendar: true, dateFormat: "H:i",}}
                                                    onChange={date => { this.timerchange("closetime",  get_timestring(date[0])); }}
                                                />                                            </FormGroup>
                                            </Col>
                                            <Col md="3" sm="12">
                                                <FormGroup >
                                                <Label for="opentime">Interval</Label>
                                                    <Input type="text" required onChange={e => this.timerchange("interval", e.target.value)} value={ this.state.timers ? this.state.timers.interval :""} id="interval" name="interval" />
                                                </FormGroup>
                                            </Col>
                                        </>  : null

                                }
                            </Row>
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
                    
        <Modal isOpen={this.state.gamemodal} toggle={this.gametoggleModal} className="modal-dialog-centered modal-lg" >
            <Form onSubmit={this.gamelinkhandleSubmit}  action="#" >
                <ModalHeader toggle={this.gametoggleModal} className="bg-primary">
                    Game Link
                </ModalHeader>
                <ModalBody className="modal-dialog-centered   mt-1">
                    <Table responsive striped>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>check</th>
                                <th>Game Name</th>
                                <th>Min Bet</th>
                                <th>Odds</th>
                                <th>Min Win</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.gamelinklist && this.state.gamelinklist.length > 0 ? this.state.gamelinklist.map((item,i)=>(
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>
                                        <CustomInput
                                            inline
                                            onChange={e => this.gamesbetprice_change(e.target.value,i,"status")}
                                            checked={item.status } 
                                            type="checkbox"
                                            id={"Status" + i}
                                            label="Status"
                                        />
                                            {/* <Checkbox color="primary"   icon={<Check className="vx-icon" size={16} />}
                                                label="Status"  /> */}
                                        </td>
                                        <td className="font-weight-bold">
                                            {item.gamename}
                                        </td>
                                        <td>
                                            <Input type="number"  onChange={e => this.gamesbetprice_change(e.target.value,i,"minbetprice")} 
                                            value={item.minbetprice}  />
                                        </td>
                                        <td>
                                            <Input type="number"  onChange={e => this.gamesbetprice_change(e.target.value,i,"oddsprice")} 
                                            value={item.oddsprice} />
                                        </td>
                                        <td>
                                            {item.minbetprice * item.oddsprice}
                                        </td>
                                    </tr> 
                                )) : null
                            }
                        </tbody>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type="submit">Accept</Button>
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
          onSelectedRowsChange={data =>
            this.setState({ selected: data.selectedRows })
          }
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
    dataList: state.matka.bazaars
  }
}

export default connect(mapStateToProps, {getData,filterData,menusave,menuupdate,menudelete,pagenationchange,gamelink_save})(Child)