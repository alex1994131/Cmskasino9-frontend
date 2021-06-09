import React, { Component } from "react"
import {UncontrolledDropdown,  DropdownMenu,  DropdownToggle,  DropdownItem,Col,Row,FormGroup,Label,Input} from "reactstrap"
import DataTable from "react-data-table-component"
import ReactPaginate from "react-paginate"
import { history } from "../../../history"
import { ChevronDown,  ChevronLeft,  ChevronRight} from "react-feather"
import { connect } from "react-redux"
import {  getData,  filterData,pagenationchange} from "../../../redux/actions/finance/index"
import {basic_options,currency_options,Payment_options} from "../../../configs/providerconfig"
import classnames from "classnames"  
import Select from "react-select"
import {selectedStyle,pagenation_set} from "../../../configs/providerconfig"
import DatePicker from "../../lib/datepicker"
import Moment from 'react-moment';
import {prefix} from "../../../authServices/rootconfig"

Moment.globalFormat = 'YYYY/MM/DD hh:mm:ss';
const CustomHeader = props => {

  return (
    <div className='p-1 pt-2 pb-2'>
      <Row>
        <Col  md='6' sm='12' xs='12'>
            <FormGroup>
              <Label for="Registration Date"> Date</Label>
              <DatePicker
               
                onChange={date => {
                  props.handleFilter([date.start,date.end],"dates")
                }}
              />
            </FormGroup>
        </Col>
        <Col  md='3' sm='6' xs='12'>
          <FormGroup>
            <Label for="player state">Cashdesk</Label>
            <Select
            
              className="React"
              classNamePrefix="select"
              id="player state"
              name="gender"
              options={basic_options}
              value={basic_options.find(obj => obj.value === "")}
              // onChange={e => props.handleFilter(e.value,"pstate")}
            />
          </FormGroup>
        </Col>

        <Col md='3' sm='6' xs='12'>
          <FormGroup>
            <Label for="player state">Currency</Label>
            <Select
            
              className="React"
              classNamePrefix="select"
              id="player-Bonus"
              name="gender"
              options={currency_options}
              value={currency_options.find(obj => obj.value === props.me.filters.currency)}
              onChange={e => props.handleFilter(e.value,"currency")}
            />
          </FormGroup>
        </Col>

        
        <Col  md='3' sm='6' xs='12'>
          <FormGroup>
            <Label for="player state">Type</Label>
            <Select
            
              className="React"
              classNamePrefix="select"
              id="player state"
              name="gender"
              options={basic_options}
              value={basic_options.find(obj => obj.value === "")}
              // onChange={e => props.handleFilter(e.value,"pstate")}
            />
          </FormGroup>
        </Col>

        <Col  md='3' sm='6' xs='12'>
          <FormGroup>
            <Label for="basicInput">Player ID</Label>
            <Input type="text"  placeholder="Enter Player ID"
              onChange={e => props.handleFilter(e.target.value,"pid")}
            />
          </FormGroup>
        </Col>
        
        <Col  md='3' sm='6' xs='12'>
          <FormGroup>
            <Label for="basicInput">External ID</Label>
            <Input type="text"  placeholder="Enter External ID"
              onChange={e => props.handleFilter(e.target.value,"externalid")}
            />
          </FormGroup>
        </Col>

        <Col  md='3' sm='6' xs='12'>
          <FormGroup>
            <Label for="basicInput">userName</Label>
            <Input type="text"  placeholder="Enter userName"
              onChange={e => props.handleFilter(e.target.value,"username")}
            />
          </FormGroup>
        </Col>

        <Col  md='3' sm='6' xs='12'>
          <FormGroup>
            <Label for="basicInput">From Amount</Label>
            <Input type="text"  placeholder="Enter From Amount"
              onChange={e => props.handleFilter(e.target.value,"playerID")}
            />
          </FormGroup>
        </Col>

        <Col  md='3' sm='6' xs='12'>
          <FormGroup>
            <Label for="basicInput">To Amount</Label>
            <Input type="text"  placeholder="Enter To Amount"
              onChange={e => props.handleFilter(e.target.value,"playerID")}
            />
          </FormGroup>
        </Col>

        <Col  md='3' sm='6' xs='12'>
          <FormGroup>
            <Label for="basicInput">Transaction Id</Label>
            <Input type="text"  placeholder="Enter Transaction Id"
              onChange={e => props.handleFilter(e.target.value,"playerID")}
            />
          </FormGroup>
        </Col>

        <Col  md='3' sm='6' xs='12'>
          <FormGroup>
            <Label for="player state">Payment Type</Label>   
            <Select
            
              className="React"
              classNamePrefix="select"
              id="player state"
              name="gender"
              options={Payment_options}
              value={Payment_options.find(obj => obj.value === "")}
              // onChange={e => props.handleFilter(e.value,"pstate")}
            />
          </FormGroup>
        </Col>
       
      </Row>
      <Row>

        <Col xs='6' className='justify-content-start align-items-center flex' md="3">
          <UncontrolledDropdown className="data-list-rows-dropdown d-block ">
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
        {/* <Col xs="6" md="3">
          <Button outline color="primary" onClick={()=>props.filterData_load()} >
            Apply
          </Button>
        </Col> */}
      </Row>
    </div>
  )
}

class ListViewConfig extends Component {
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
            name: "id",
            selector: "id",
            sortable: true,
            minWidth: "100px",
            cell: row => (
              <div className="textstyle">
                {prefix} {row.userid.signup_device ? row.userid.signup_device : "" } - {row.userid.fakeid}
              </div>
            )
          },
          {
            name: "username",
            selector: "username",
            sortable: true,
            minWidth: "100px",
            cell: row => (
              <>
                {row.userid.username ? row.userid.username : ""}
              </>
            )
          },
          {
              name: "email",
              selector: "email",
              sortable: true,
              minWidth: "220px",
              cell: row => (
                <>
                  {row.userid.email ? row.userid.email : ""}
                </>
              )
          },
          {
            name: "MObileNumber",
            selector: "id",
            sortable: true,
            minWidth: "50px",
            cell: row => (
              <>
                {row.userid.mobilenumber ? row.userid.mobilenumber : ""}
              </>
            )
          },
          {
            name: "amounttype",
            selector: "wallettype",
            minWidth:  "150px",
            sortable: true,
          },
          
          {
            name: "status",
            selector: "status",
            minWidth:  "100px",
            sortable: true
          },
          {
            name: "Comment",
            selector: "type",
            sortable: true,
            minWidth:  "100px",
            cell : row =>(
              <div>
                <Input type="textarea" value={row.comment ? row.comment : "comment"} disabled={true} />
              </div>
            )
          },
          {
            name: "paymentType",
            minWidth:  "100px",
            selector: "type",
            sortable: true,
          },
          // {
          //   name: "Bank Name",
          //   minWidth:  "100px",
          //   selector: "ps_name",
          //   sortable: true,
          // },
          {
            name: "amount",
            selector: "amount",
            minWidth:  "100px",
            sortable: true,
          },
          {
            minWidth:  "100px",
            name: "lastbalance",
            selector: "lastbalance",
            sortable: true,
            cell : row =>(
              <div>
                {parseInt(row.lastbalance)}
              </div>
            )
          },
          {
            name: "updatedbalance",
            minWidth:  "100px",
            selector: "updatedbalance",
            sortable: true,
            cell : row =>(
              <div>
                {parseInt(row.updatedbalance)}
              </div>
            )
          },
          {
            name: "createDate",
            minWidth:  "100px",
            selector: "createDate",
            sortable: true,
            cell: row => (
                <span>
                  <Moment  date={(new Date(row.createDate))} />
                </span>
            )
          },
        ],
        allData: [],
        value: "",
        rowsPerPage: pagenation_set[0],
        currentData: null,
        selected: [],
        totalRecords: 0,
        sortIndex: [],
        sidebar: false,
        addNew: false,
        filters : {
          dates:[new Date(),new Date( new Date().valueOf() + 60 * 60 * 24 * 1000)],
          pid : "",
          username : "",
          currency : "",
          externalid : ""
        }
    }

    componentDidMount(){
      this.props.getData(this.props.parsedFilter,this.state.filters)
    }


    handleFilter = async (value,bool) => {
      var fillters = this.state.filters;
      fillters[bool] = value;
      await this.setState({ fillters: fillters });
      this.props.getData(this.props.parsedFilter,this.state.filters)
    }

    filterData_load = () =>{
    }

    handleRowsPerPage = value => {
      let { parsedFilter, pagenationchange } = this.props
      let page = parsedFilter.page !== undefined ? parsedFilter.page : 1
      history.push(`${history.location.pathname}?page=${page}&perPage=${value}`)
      this.setState({ rowsPerPage: value })
      pagenationchange({ page: page, perPage: value })
    }

    handleSidebar = (boolean, addNew = false) => {
      this.setState({ sidebar: boolean })
      if (addNew === true) this.setState({ currentData: null, addNew: true })
    }

    handleCurrentData = obj => {
      this.setState({ currentData: obj })
      this.handleSidebar(true)
    }
  
    handlePagination = page => {
        let { parsedFilter, pagenationchange } = this.props
        let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : pagenation_set[0]
        let urlPrefix = `${history.location.pathname}`
        history.push(
            `${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`
        )
        pagenationchange({ page: page.selected + 1, perPage: perPage })
        this.setState({ currentPage: page.selected })
    }

  render() {
    let { columns, data, allData,
      totalPages,
      value,
      rowsPerPage,
      sidebar,
      totalRecords,
      sortIndex
    } = this.state
    return (
      <>

      <div id="admindata_table" className={`data-list list-view`}>
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
              handleSidebar={this.handleSidebar}
              me={this.state}
              index={sortIndex}
              filterData_load={this.filterData_load}
              parsedFilter={this.props.parsedFilter}
            />
          }
          sortIcon={<ChevronDown />}
        />

       
        <div
          className={classnames("data-list-overlay", {
            show: sidebar
          })}
          onClick={() => this.handleSidebar(false, true)}
        />
      </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    dataList: state.finance.finance
  }
}

export default connect(mapStateToProps, {
    getData,
    filterData,pagenationchange
})(ListViewConfig)
