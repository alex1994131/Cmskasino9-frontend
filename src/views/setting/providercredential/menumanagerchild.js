import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  getData,update} from "../../../redux/actions/settting/providercredential"
import { JsonEditor as Editor } from 'jsoneditor-react';
import { Table ,Col} from "reactstrap"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap"

export class menumanagerchild extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      configs : null,
      modal: false,
      selectconfig : {},
      item : ""
    }
  }
  
  componentDidMount(){
    this.props.getData();
  }

  componentDidUpdate(prevProps,prevState){
    if(this.props.dataList.edit !== prevState.configs){
      this.setState({configs : this.props.dataList.edit})
    }
  }

  update =() =>{
    this.props.update(this.state.selectconfig,this.state.item);
    this.toggleModal()
  }

  change = (item) =>{
    this.setState({selectconfig : this.state.configs[item],item : item});
    this.toggleModal()
  }
  
  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  render(){
    return (
      <div>
        {/* <Button color="success" onClick={()=>this.update()} > save  </Button> */}
        {/* {
          this.state.configs ? 
          <Editor
            value={this.state.configs}
            onChange={(e)=>this.setState({configs : e})}
          /> : null
        } */}
            <Table responsive>
          <thead>
            <tr>
              <th>Menu</th>
              <th>Action</th>
             </tr>
          </thead>
          <tbody>
            {
              this.state.configs ? 
              Object.keys(this.state.configs).map((item,i)=>(
                <tr key={i}>
                  <th scope="row">{item}</th>
                  <td onClick={()=>this.change(item)} className="font-weight-bold cursor-pointer">Edit</td>
              </tr>
              )) : null              
            }
          </tbody>
        </Table>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal} className="modal-dialog-centered modal-lg" >
          <ModalHeader toggle={this.toggleModal} className="bg-primary">
          Large Modal
          </ModalHeader>
          <ModalBody className="modal-dialog-centered">
              <Col md="12">
                <Editor
                  value={this.state.selectconfig}
                  onChange={(e)=>this.setState({ selectconfig : e})}
                />
              </Col>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.update}>
              Accept
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  dataList: state.setting.pro_credential 
})

const mapDispatchToProps = {
  getData,update
}

export default connect(mapStateToProps, mapDispatchToProps)(menumanagerchild)
