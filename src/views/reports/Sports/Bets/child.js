import React, { Component } from "react"
import {UncontrolledDropdown,  DropdownMenu,  DropdownToggle,  DropdownItem,Col,Row,FormGroup,Label,Badge,Table } from "reactstrap"
import DataTable from "react-data-table-component"
import ReactPaginate from "react-paginate"
import { history } from "../../../../history"
import { ChevronDown,  ChevronLeft,  ChevronRight} from "react-feather"
import { connect } from "react-redux"
import {  getData,pagenationchange} from "../../../../redux/actions/reports/casino/casinoproviders"
import Flatpickr from "react-flatpickr";
import {Playerstate_options,Bonus_options,currency_options,selectedStyle,pagenation_set} from "../../../../configs/providerconfig"
import classnames from "classnames"
import Select from "react-select"
import {get_GGR_value,get_total_value,get_total_ggr_value} from "../../../../redux/actions/auth/index"

const FilterComponent = props =>{
  return (
      <Row>
        <Col  md='6' sm='12' xs='12'>
          <FormGroup>
            <Label for="Registration Date">Registration Date</Label>
            <Flatpickr data-enable-time value={props.me.filters.dates}
              className="form-control"
              options={{  mode: "range"  }}
              onChange={date => {  props.handleFilter(date,"dates") }}
            />
          </FormGroup>
        </Col>
        <Col  md='3' sm='6' xs='12'>
          {/* <FormGroup>
            <Label for="basicInput">Provider</Label>
            <Input  type="text"  placeholder="Enter Provider "
              onChange={e => props.handleFilter(e.target.value,"PROVIDERID")}
            />
          </FormGroup> */}
            <Label for="player state">Provider</Label>
            <Select 
              options={props.dataList.providerData} 
              className="React"
              classNamePrefix="select"
              value={props.dataList.providerData ? props.dataList.providerData.find(obj=>obj.value === props.me.filters.providerss)  : "" }
              onChange={e => props.handleFilter(e.value,"PROVIDERID")}
              name="language" placeholder="Choose your Provider" 
            />
        </Col>
        <Col  md='3' sm='6' xs='12'>
          <FormGroup>
            <Label for="player state">Player State</Label>
            <Select
              className="React"
              classNamePrefix="select"
              id="player state"
              name="gender"
              options={Playerstate_options}
              value={Playerstate_options.find(obj => obj.value === props.me.filters.pstate)}
              onChange={e => props.handleFilter(e.value,"pstate")}
            />
          </FormGroup>
        </Col>
        <Col md='3' sm='6' xs='12'>
          <FormGroup>
            <Label for="player Bonus">Is Bonus</Label>
            <Select              
              className="React"
              classNamePrefix="select"
              id="player Bonus"
              name="gender"
              options={Bonus_options}
              value={Bonus_options.find(obj => obj.value === props.me.filters.ibonus)}
              onChange={e => props.handleFilter(e.value,"ibonus")}
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
      </Row>
  )
}

const CustomHeader = props => {
  return (
    <div className='p-1 pt-2 pb-2'>
      <Row>
        <Col md="12">
        <Table bordered responsive>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Visits</th>
              <th>Sign up</th>
              <th>Cash in</th>
              <th>Cash out</th>
              <th>Total BET</th>
              <th>Total WIN</th>
              <th>Total GGR</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>INR</th>
              <th>00</th>
              <th>0.00</th>
              <th>0.00</th>
              <th>0.00</th>
              <td>
                <Badge color={ "light-danger"} pill style={{fontSize:"15px"}}>{ get_total_value("BET",props.dataList.allData) }
                </Badge>
              </td>
              <td>
                <Badge color={ "light-success"} pill style={{fontSize:"15px"}}>{ get_total_value("WIN",props.dataList.allData) }
                </Badge>
              </td>
              <td>
                <Badge color={ "light-warning"} pill style={{fontSize:"15px"}}>{ get_total_ggr_value(props.dataList.allData) }
                </Badge>
              </td>
            </tr>
          </tbody>
        </Table>
        </Col>
        <Col xs='6' className='justify-content-start align-items-center flex' md="3">
          <UncontrolledDropdown className="data-list-rows-dropdown d-block ">
            <DropdownToggle color="" className="sort-dropdown">
              <span className="align-middle mx-50">
                {`${props.index[0] && props.index[0] > 0 ? props.index[0] : 0} - ${props.index[1] ? props.index[1] : 0} of ${props.total}`}
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
      </Row>
    </div>
  )
}

class ListViewConfig extends Component {
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
          name : "PROVIDEr",
          selector : "PROVIDERID",
          sortable: true,
          minWidth: "100px",
        },
        {
          name : "Currency",
          selector : "Currency",
          sortable: true,
          minWidth: "100px",
          cell : row =>(
            <Badge color={ "light-warning"} style={{fontSize:"15px"}} pill>
            {row.Currency? row.Currency : "INR"}
          </Badge>
          )
        },
        {
          name : "WIN",
          selector : "WIN",
          sortable: true,
          minWidth: "100px",
          cell : row =>(
            <Badge color={ "light-danger"} pill style={{fontSize:"15px"}} >    
            {row.WIN? (row.WIN).toFixed(0) : "0"}
          </Badge>
          )
        },
        {
          name : "BET",
          selector : "BET",
          sortable: true,
          minWidth: "100px",
          cell : row =>(
            <Badge color={ "light-success"} style={{fontSize:"15px"}} pill>
            {row.BET? (row.BET).toFixed(0) : "0"}
          </Badge>
          )
        },
        {
          name : "GGR",
          selector : "GGR",
          sortable: true,
          minWidth: "100px",
          cell : row =>(
            <Badge color={ "light-warning"} pill style={{fontSize:"15px"}}>
            {get_GGR_value(row)}
          </Badge>
          )
        },
        {
          name : "WIN RAKE",
          selector : "",
          sortable: true,
          minWidth: "100px",
        },
        {
          name : "BET RAKE",
          selector : "",
          sortable: true,
          minWidth: "100px",
        },
      ],
      allData: [],
      value: "",
      rowsPerPage: 10,
      currentData: null,
      selected: [],
      totalRecords: 0,
      sortIndex: [],
      sidebar: false,
      addNew: false,
      filters : {
        dates:[(new Date()-86400000),new Date()],
        PROVIDERID : "",
        pstate : "0",
        ibonus : "0",
        currency : "0"
      }
    }

    componentDidMount(){
      this.props.getData(this.props.parsedFilter,this.state.filters)
    }

    handleFilter =async (value,bool) => {
      var fillters = this.state.filters;
      fillters[bool] = value;
      await this.setState({ fillters: fillters });
      this.props.getData(this.props.parsedFilter,this.state.filters)
    }

    filterData_load = () =>{
      this.props.getData(this.props.parsedFilter,this.state.filters)
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
      let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 10
      let urlPrefix = `${history.location.pathname}`
      history.push(`${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`)
      pagenationchange({ page: page.selected + 1, perPage: perPage })
      this.setState({ currentPage: page.selected })
    }

  render() {
    let { columns, data, allData,totalPages, value,rowsPerPage,sidebar, totalRecords, sortIndex } = this.state
    return (
      <>
        <FilterComponent 
          handleFilter={this.handleFilter}
          handleRowsPerPage={this.handleRowsPerPage}
          rowsPerPage={rowsPerPage}
          total={totalRecords}
          handleSidebar={this.handleSidebar}
          dataList={this.props.dataList}
          me={this.state}
          index={sortIndex}
          filterData_load={this.filterData_load}
          parsedFilter={this.props.parsedFilter}
        />
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
                forcePage={ this.props.parsedFilter.page ? parseInt(this.props.parsedFilter.page - 1) : 0 }
                onPageChange={page => this.handlePagination(page)}
              />
            )}
            noHeader
            subHeader
            noDataComponent={
              <div style={{minHeight:"150px"}}>
                There are no records to display
              </div>
            }
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
                dataList={this.props.dataList}
                handleSidebar={this.handleSidebar}
                me={this.state}
                index={sortIndex}
                filterData_load={this.filterData_load}
                parsedFilter={this.props.parsedFilter}
              />
            }
            sortIcon={<ChevronDown />}
          />
          <div className={classnames("data-list-overlay", { show: sidebar })} onClick={() => this.handleSidebar(false, true)} />
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    dataList: state.Reports.reportscasinoproviders
  }
}

export default connect(mapStateToProps, {    getData,pagenationchange})(ListViewConfig)
