import React, { Component } from 'react'
import { connect } from 'react-redux'
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb"
import {Row,Col} from "reactstrap"
import Datepicker from "../../../lib/datepicker"
import {
    Modal,
    ModalHeader,
    ModalBody,
  } from "reactstrap"

export class event extends Component {

    state = {
        modal: false,
        bets : 0,
        amt : 0,
        profit :0
      }

    datechange =  (e) =>{

    }

    show = (itemk) =>{
        this.setState({modal : !this.state.modal,bets :itemk.bets , amt : itemk.amt,profit : 0,num :itemk.num })
    }

    toggleModal = () => {
        this.setState(prevState => ({
          modal: !prevState.modal
        }))
      }

    render() {
        const {numbers,bazaritem} = this.props.location.state;
        return (
            <React.Fragment>
                <Breadcrumbs breadCrumbTitle="Satta"  breadCrumbParent="Matka6"  breadCrumbParent2="Dashboard"/>
                    <Row className='height-100'>
                        <Col md="3" sm="12">
                            <Datepicker onChange={(date)=>this.datechange(date)} />
                        </Col>
                        <Col md="3" sm="12" className="font-weight-bold color-white p-1 text-center">
                            {bazaritem.bazaarname}
                        </Col>
                        <Col md="3" sm="12" className="font-weight-bold color-white p-0 text-center">
                            <p className='p-0 m-0'>
                                RESULT : {bazaritem.result ? bazaritem.result.openresult +" - " +bazaritem.result.jodiresult+ " - "+bazaritem.result.closeresult : " - - -" }
                            </p>
                            <p className='p-0 m-0'>
                                Total Bets :  {bazaritem.to_count} &nbsp;&nbsp;
                                Total Amt :  {bazaritem.to_amount}
                            </p>
                        </Col>
                        {
                            numbers && numbers.length > 0 ?
                            numbers.map((item,i)=>(
                                <React.Fragment key={i}>
                                    <Col md="12" className="color-white text-left p-1">
                                        {item.gamesitem.name} - {item.timerflag === "1" ? "open" : item.timerflag === "2" ? "close" : "open close" }
                                    </Col>
                                        {
                                            item.numbers.map((nitem,j)=>(
                                                <React.Fragment key={j}>
                                                    <Col className="color-white text-center p-1" md="6" sm="12">
                                                        {nitem.name ? nitem.name : ""}
                                                    </Col>
                                                    <Col className="color-white text-center p-1" md="6" sm="12">
                                                        Total Amt: {   nitem.totala }, Bets : { nitem.totalc } ,Profit : {nitem.totalp ?nitem.totalp : 0}
                                                    </Col>
                                                    {nitem.list && nitem.list.length > 0 ? nitem.list.map((itemk,k)=>(
                                                            <Col onClick={()=>this.show(itemk)} md={1} sm="3" className={"m-0 numberitem color-white cursor-pointer "+( itemk.bets === 0 ? "" : " transparent")}  key={k} >
                                                                <p className="p-0 m-0">
                                                                    <span className="font-weight-bold" style={{color :"orange"}}>
                                                                        {itemk.num}
                                                                    </span>
                                                                </p>
                                                                <p  className="p-0 m-0">
                                                                    Bets : {itemk.bets}
                                                                </p>
                                                                <p  className="p-0 m-0">
                                                                    Amt : {itemk.amt}
                                                                </p>
                                                            </Col>
                                                        )):null
                                                    }
                                                </React.Fragment>
                                            ))
                                        }
                                </React.Fragment>
                            )) : null
                        }
                       
                    </Row>
                    <Modal isOpen={this.state.modal} toggle={this.toggleModal} className="modal-dialog-centered modal-sm" >
                        <ModalHeader toggle={this.toggleModal} className="bg-primary">
                            Show
                        </ModalHeader>
                        <ModalBody className="modal-dialog-centered d-block color-white">
                            <p>Number : { this.state.num}</p>
                            <p>Bets : { this.state.bets}</p>
                            <p>Amt : { this.state.amt}</p>
                            <p>Profit : { this.state.profit}</p>
                        </ModalBody>
                        {/* <ModalFooter>
                        <Button color="primary" onClick={this.toggleModal}>
                            Accept
                        </Button>
                        </ModalFooter> */}
                    </Modal>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(event)
