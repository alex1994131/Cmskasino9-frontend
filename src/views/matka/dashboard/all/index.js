import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getData} from "../../../../redux/actions/matka/dashboard/regular"
import {Row,Col,} from "reactstrap"
import Bazar from "./bazaar"
import {Bazaartype_key} from "../../../../configs/providerconfig"
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb"
import Flatpickr from "react-flatpickr";

export class index extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            date : new Date()
        }
    }
    

    componentDidMount(){
        this.props.getData(this.state.date)
    }

    render() {
        const bazaars = this.props.bazaars;
        let rebazaars = bazaars[Bazaartype_key.regular];
        let kingbazaars = bazaars[Bazaartype_key["king-bazaar"]];
        let startbazaars = bazaars[Bazaartype_key.starline];
        // let rebazaars = bazaars.filter(obj=>obj.bazaartype === Bazaartype_key.regular);
        // let kingbazaars = bazaars.filter(obj=>obj.bazaartype === Bazaartype_key['king-bazaar']);
        // let startbazaars = bazaars.filter(obj=>obj.bazaartype === Bazaartype_key.starline);
        return (
            <React.Fragment>
                <Breadcrumbs breadCrumbTitle="Satta"  breadCrumbParent="Matka6"  breadCrumbParent2="Dashboard"/>
                <Row>
                    <Col md="3" sm="12">
                        <Flatpickr
                            className="form-control"
                            value={this.state.date}
                            onChange={date => { this.setState({ date : date }); }}
                        />
                    </Col>
                </Row>
                <Row >
                    {
                        rebazaars &&rebazaars.length > 0 ?
                        <Col md="12">
                            <div  className="font-weight-bold w-100 bazaaritem-header p-1 text-center"  >
                                <span className="text-uppercase">regular</span> 
                            </div>
                            <Bazar  bazaars={rebazaars} gamelist={this.props.gamesdata} />
                        </Col>
                        : null
                    }
                     {
                        kingbazaars &&kingbazaars.length > 0 ?
                        <Col md="12">
                            <div  className="font-weight-bold w-100 bazaaritem-header p-1 text-center"  >
                                <span className="text-uppercase">king-bazaar</span> 
                            </div>
                            <Bazar  bazaars={kingbazaars} gamelist={this.props.gamesdata} />
                        </Col>
                        : null
                    }
                     {
                        startbazaars &&startbazaars.length > 0 ?
                        <Col md="12">
                            <div  className="font-weight-bold w-100 bazaaritem-header p-1 text-center"  >
                                <span className="text-uppercase">starline</span> 
                            </div>
                            <Bazar  bazaars={startbazaars} gamelist={this.props.gamesdata} />
                        </Col>
                        : null
                    }
                </Row>
            </React.Fragment>

        )
    }
}

const mapStateToProps = (state) => ({
    bazaars : state.matka.regular.bazaarsdata,
    gamesdata : state.matka.regular.gamesdata,
})

const mapDispatchToProps = {
    getData
}

export default connect(mapStateToProps, mapDispatchToProps)(index)
