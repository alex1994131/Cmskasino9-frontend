// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb"
// import {Row,Col} from "reactstrap"
// import {Gamelist_} from "../../../../configs/providerconfig"
// import Radio from "../../../../components/@vuexy/radio/RadioVuexy"

// export class resultannouncer extends Component {

//     constructor(props) {
//         super(props)
    
//         this.state = {
//             date : new Date()
//         }
//     }

//     select_bazar = (item) =>{

//     }
    

//     render() {
//         const {win_numbers,bazaritem,gamesdata} = this.props.location.state;
//         return (
//             <React.Fragment>
//                 <Breadcrumbs breadCrumbTitle="Satta"  breadCrumbParent="Matka6"  breadCrumbParent2="Dashboard"/>
//                     <Row className='height-100 satta'>
//                         <Col md="12" className="color-white mb-1">
//                             {
//                                 bazaritem.bazaarname
//                             }
//                         </Col>
//                         <Col md="12" className="mt-0">
//                             <div className="tblbazaarheader" style={{width:"5%"}}>
//                                 select
//                             </div>
//                             {
//                                 Gamelist_.slice(1,10).map((item,i)=>(
//                                     <div className="tblbazaarheader" style={{width:"10.5%"}} key={i}>
//                                         {item}
//                                     </div>
//                                 ))
//                             }
//                         </Col>               
//                             {win_numbers.slice(0,20).map((item,i)=>(
//                                 <React.Fragment key={i}>
//                                     <Col md="12"className="d-flex">
//                                         <div className="numberitem justify-content-center d-flex align-items-center" style={{width:"5%"}}>
//                                             <Radio onClick={()=>this.select_bazar(item)} label="" name="exampleRadio" />
//                                         </div>
//                                         <div className="numberitem" style={{width:"10.5%"}}>
//                                             {item.result}
//                                         </div>
//                                         {
//                                             gamesdata.map((gitem,i)=>(
//                                                 <div key={i} className="numberitem" style={{width:"10.5%"}}>
//                                                 {
//                                                     item[gitem._id]
//                                                 }
//                                             </div>                      
//                                             ))
//                                         }
                                           
//                                         <div className="numberitem" style={{width:"10.5%"}}>
//                                             {
//                                                 item.totalprofit
//                                             }
//                                         </div>
//                                     </Col>
//                                 </React.Fragment>
//                             ))}
//                     </Row>
//                 </React.Fragment>
//         )
//     }
// }

// const mapStateToProps = (state) => ({
//     gamesdata : state.matka.regular.gamesdata,

// })

// const mapDispatchToProps = {
    
// }

// export default connect(mapStateToProps, mapDispatchToProps)(resultannouncer)


import React from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb"
import ListViewConfig from "./announcerchild"
import queryString from "query-string"
class MenuManager extends React.Component {
  
  render() {
    const {bazaritem,gamesdata,date} = this.props.location.state;
    return (
      <React.Fragment>
        <Breadcrumbs breadCrumbTitle="Satta"  breadCrumbParent="Matka6"  breadCrumbParent2="Dashboard"/>
        <Row>
          <Col sm="12">
            <ListViewConfig  bazaritem={bazaritem}  date={date} gamesdata = {gamesdata} parsedFilter={queryString.parse(this.props.location.search)}/>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default MenuManager