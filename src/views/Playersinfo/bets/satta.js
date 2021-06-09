import React, { Component } from "react"
import {UncontrolledDropdown,  DropdownMenu,  DropdownToggle,DropdownItem,Col,Row, Label,Badge,
} from "reactstrap"
import DataTable from "react-data-table-component"
import ReactPaginate from "react-paginate"
import { history } from "../../../history"
import { ChevronDown,  ChevronLeft,  ChevronRight} from "react-feather"
import { connect } from "react-redux"
import {selectedStyle,pagenation_set} from "../../../configs/providerconfig"
import {satta_history_load} from "../../../redux/actions/profileinfo"
import Datepicker from "../../lib/datepicker"
import Moment from 'react-moment';
import {Bazaartype} from "../../../configs/providerconfig"
Moment.globalFormat = 'YYYY/MM/DD hh:mm:ss';


const CustomHeader = props => {
  let {totalRecords,sortIndex} = props.dataList;
  return (
    <div className='p-1 pt-2 pb-2'>
    <Row>
        <Col xs='6' className='justify-content-start align-items-center flex' md="3">
            <UncontrolledDropdown className="data-list-rows-dropdown d-block ">
            <DropdownToggle color="" className="sort-dropdown">
                <span className="align-middle mx-50">
                {`${sortIndex[0]} - ${sortIndex[1]} of ${totalRecords}`}
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
        <Col  md='6' sm='12' xs='12'>
          <Label for="Registration Date">Select Date</Label> 
          <Datepicker  onChange={date => { props.datechange(date) }} />
        </Col>
         
    </Row>
  </div>
  )
}

class AccountStatement extends Component {

    state = {
        data: [],
        columns: [
          {
              name: "Betid",
              selector: "transactionid",
              sortable: true,
            }, 
            {
              name: "Bazaartype",
              selector: "BazaarType",
              sortable: true,
              cell: row => (
                  <div>
                    {Bazaartype[row.bazaarid.bazaartype]}
                  </div>
              )
            },
            {
              name: "BazzarName",
              selector: "BazzarName",
              sortable: true,
              cell: row => (
                  <div>
                    {row.bazaarid.bazaarname}
                  </div>
              )
            },
            {
              name: "Gamename",
              selector: "GameName",
              sortable: true,
              cell: row => (
                <div>
                  {row.gameid.name}
                </div>
              )
            },
            {
              name: "betnumber",
              selector: "betnumber",
              sortable: true,
            },  
            {
              name: "type",
              selector: "type",
              sortable: true,
            },  
            {
              name: "amount",
              selector: "amount",
              sortable: true,
            },  
            {
              name: "currency",
              selector: "currency",
              sortable: true,
              cell: row => (
                <Badge pill color = "light-success">
                  INR
                </Badge>
              )
            },
            {
              name: "status",
              selector: "status",
              sortable: true,
              cell : row =>(
                <Badge pill color = { row.status === "1" ? "light-warning" :  row.status === "2" ?  "light-success" : "light-danger"}>
                  { row.status === "1" ? "Pending" :  row.status === "2" ?  "win" : "lost"}
                </Badge >
              )
            }, 
            {
              name: "DATE",
              selector: "DATE",
              sortable: true,
              cell: row => (
                <span>
                  {(new Date(row.DATE)).toDateString()}
                </span>
              )
            },
        ],
        date : {
            start : new Date(),
            end : new Date(new Date().valueOf() + 24 * 60 * 60 * 1000),
        }
    }

    componentDidMount(){
      console.log(this.props)
        // this.props.satta_history_load(this.state.date,this.props.user,this.props.parsedFilter)
    }

   

    handlePagination = page => {
      let { parsedFilter, satta_history_load } = this.props;
      let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : pagenation_set[0];
      let urlPrefix =`${history.location.pathname}`;
      let row = this.props.user;
      history.push( `${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`,row);
      var params = { page: page.selected + 1, perPage: perPage };
      satta_history_load(this.state.date,this.props.user,params);
    }

    componentDidUpdate(preveProps,prevState){
      if(preveProps.dataList !== this.props.dataList){
        let datalist = this.props.dataList;
        this.setState({
          data : datalist.data,
          totalPages: datalist.totalPages,
        })
      }
    }

    handleRowsPerPage = value => {
      let { parsedFilter, satta_history_load } = this.props
      let page = parsedFilter.page !== undefined ? parsedFilter.page : 1;
      let row = this.props.user;
      history.push(`${history.location.pathname}?page=${page}&perPage=${value}`,row)
      var params = { page: page, perPage: value };
      satta_history_load(this.state.date,this.props.user,params);
    }

    change = (e) => {
        console.log(e,this)
        this.setState({date : e});
        this.props.satta_history_load(e,this.props.user,this.props.parsedFilter)
    }


    render() {
    let { columns,data,totalPages} = this.state
    return (
      <React.Fragment>
        <div id="admindata_table" className={`data-list list-view`}>
          <DataTable
            columns={columns}
            data={data}
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
            customStyles={selectedStyle}
            subHeaderComponent={
              <CustomHeader
                handleRowsPerPage={this.handleRowsPerPage}
                dataList={this.props.dataList}
                datechange={(e)=>this.change(e)}
                add={()=>this.setState({modal : !this.state.modal , update : false , type : "" , accountName : ""})}
              />
            }
            sortIcon={<ChevronDown />}
          />
        </div>

        
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
    dataList :  state.profileinfo.Satta
})

const mapDispatchToProps = {
  satta_history_load
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountStatement)

