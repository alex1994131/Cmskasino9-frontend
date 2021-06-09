import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Row,Col} from "reactstrap"
import {Gamelist} from "../../../../configs/providerconfig"
import {Lock} from "react-feather"
import Media from 'react-media';
import {get_bets_frombazaar,go_toPage_resultannounce } from "../../../../redux/actions/matka/dashboard/regular"

export class bazaar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bazar : this.props.bazaars,
            gamelist : this.props.gamelist,
            newrow : null,
            NAME : this.props.name,
            bool : "",
            flag : true,
        }
    }

    bazaraction = (bazaar) =>{
        this.props.get_bets_frombazaar(bazaar,new Date())
    }
    
    ResultAnnouncer = (bazzar) =>{
        this.props.go_toPage_resultannounce(bazzar,new Date())
    }

    games_part_render = (item,width,s,e) =>{
        let gamesdata = this.props.gamelist;
        return <React.Fragment>
            {
                    gamesdata && gamesdata.length > 0 ?
                    gamesdata.slice(s,e).map((gameitem,j)=>(
                    <React.Fragment key={j}>
                        {
                            item[gameitem._id] && item[gameitem._id].length === 1 ?
                            <div className="tblbazaaritem" style={{width : width + "%"}}>
                                {  
                                    !item[gameitem._id][0].lock ? 
                                        item[gameitem._id][0].time_flag === "3"  ?
                                            <>
                                                <div className="child" >
                                                    <p> open-close </p>
                                                    <p> Bets : {item[gameitem._id][0].NoOfbets} </p>
                                                    <p> AMT :{item[gameitem._id][0].amount} </p>
                                                </div>
                                            </>  
                                        : 
                                            item[gameitem._id][0].time_flag === "1" ?
                                                <>
                                                <div className="child" >
                                                        <p> open </p>
                                                        <p>Bets :  {item[gameitem._id][0].NoOfbets} </p>
                                                    <p>  AMT :{item[gameitem._id][0].amount} </p>
                                                    </div>
                                                </>
                                            :
                                                <>
                                                    <div className="child" >
                                                    <p> close </p>
                                                    <p>Bets :  {item[gameitem._id][0].NoOfbets} </p>
                                                    <p> AMT :{item[gameitem._id][0].amount} </p>
                                                    </div>
                                                </>
                                    :  
                                        <div className="child text-center justify-content-center d-flex">
                                            <Lock size={20} className="font-weight-bold" style={{color:"white"}} />
                                        </div>
                                }
                            </div>
                        :
                            <div className="tblbazaaritem" style={{width : width + "%"}}>
                                {
                                    item[gameitem._id].length === 2 ?
                                        <>
                                            <div className="child1">
                                                <p>open</p>
                                                <p> Bets :  {item[gameitem._id][0].NoOfbets} </p>
                                                <p>AMT : {item[gameitem._id][0].amount} </p>
                                            </div>
                                            <div className="child1" >
                                                <p>close</p>
                                                <p>Bets :   {item[gameitem._id][1].NoOfbets} </p>
                                            <p> AMT :{item[gameitem._id][1].amount} </p>
                                            </div>
                                        </> 
                                    :
                                        <div className="child text-center justify-content-center d-flex">
                                            <Lock size={20} className="font-weight-bold" style={{color:"white"}} />
                                        </div>                                     
                                }
                            </div>
                        } 
                    </React.Fragment>
                )) : null
            }
        </React.Fragment>
    }
    

    render() {
        return (
            <div className='sports-background'>
                <Row className="satta">
                    <Media queries={{ small: "(max-width: 1430px)",large: "(min-width: 1431px)" }}>
                        {matches => (
                            <React.Fragment>
                            {matches.small && 
                                <>
                                    <Col md="12" className="mt-0">
                                        {
                                            Gamelist.slice(0,5).map((item,i)=>(
                                                <div className="tblbazaarheader" style={{width :"20%"}} key={i}>
                                                    {item}
                                                </div>
                                            ))
                                        }
                                    </Col>
                                    {
                                        this.state.bazar && this.state.bazar.length > 0 ?
                                        this.state.bazar.map((item,i)=>(
                                            <React.Fragment key={i}>
                                                <Col md="12" className="d-flex">
                                                    <div className="tblbazaaritem" style={{width :"20%"}} onClick={()=>this.bazaraction(item)}>
                                                        <div className="child d-flex text-center justify-content-center">
                                                            <span className=""> { item.bazaarname }
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="tblbazaaritem" style={{width :"20%"}}>
                                                        <div className="child d-flex text-center justify-content-center">
                                                            <div>
                                                                <p className="font-weight-bold" style={{color:"green"}}>{item.result ? item.result.openresult +"-" + item.result.jodiresult +"-" +item.result.closeresult  : "---"  }</p>
                                                                <p>
                                                                    Bets: {item.to_count}
                                                                </p>
                                                                <p>
                                                                    AMT: {item.to_amount}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tblbazaaritem"  style={{width :"20%"}} onClick={()=>this.ResultAnnouncer(item)}>
                                                        <div className="child d-flex text-center justify-content-center">
                                                            <span className=""> Result Announcer 
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {this.games_part_render(item,20,0,2)}
                                                </Col>
                                            </React.Fragment>
                                        ))
                                        : null
                                    }
                                    <Col md="12" className="mt-1">
                                        {
                                            Gamelist.slice(5,10).map((item,i)=>(
                                                <div className="tblbazaarheader" key={i} style={{width :"20%"}} >
                                                    {item}
                                                </div>
                                            ))
                                        }
                                    </Col>
                                    {
                                        this.state.bazar && this.state.bazar.length > 0 ?
                                        this.state.bazar.map((item,i)=>(
                                            <React.Fragment key={i}>
                                                <Col md="12" className="d-flex">
                                                    {this.games_part_render(item,20,2,8)}
                                                </Col>
                                            </React.Fragment>
                                        ))
                                        : null
                                    }
                                </>
                            }
                            {matches.large &&
                                <>
                                    <Col md="12" className="mt-0">
                                    {
                                        Gamelist.map((item,i)=>(
                                            <div className="tblbazaarheader" key={i}>
                                                {item}
                                            </div>
                                        ))
                                    }
                                    </Col>
                                    {
                                        this.state.bazar && this.state.bazar.length > 0 ?
                                        this.state.bazar.map((item,i)=>(
                                            <React.Fragment key={i}>
                                                <Col md="12" className="d-flex">
                                                    <div className="tblbazaaritem" onClick={()=>this.bazaraction(item)}>
                                                        <div className="child d-flex text-center justify-content-center">
                                                            <span className=""> { item.bazaarname }
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="tblbazaaritem">
                                                        <div className="child d-flex text-center justify-content-center">
                                                            <div>
                                                                <p className="font-weight-bold" style={{color:"green"}}>{item.result ? item.result.openresult +"-" + item.result.jodiresult +"-" +item.result.closeresult  : "---"  }</p>
                                                                <p> Bets: {item.to_count} </p>
                                                                <p> AMT: {item.to_amount} </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tblbazaaritem" onClick={()=>this.ResultAnnouncer(item)}>
                                                        <div className="child d-flex text-center justify-content-center">
                                                            <span className=""> Result Announcer 
                                                            </span>
                                                        </div>
                                                    </div>
                                                        {this.games_part_render(item,10,0,8)}
                                                </Col>
                                            </React.Fragment>
                                        ))
                                        : null
                                    }
                                </>
                            }
                            </React.Fragment>
                        )}
                    </Media>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    numbersdata : state.matka.regular.numbersdata,
    gamesdata : state.matka.regular.gamesdata,
})

const mapDispatchToProps = {
    get_bets_frombazaar,go_toPage_resultannounce
}

export default connect(mapStateToProps, mapDispatchToProps)(bazaar)
