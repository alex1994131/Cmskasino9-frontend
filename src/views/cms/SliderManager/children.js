import React from 'react'
import {CustomInput, Modal,ModalHeader,ModalBody,ModalFooter,Button,Col,FormGroup,Input,Label} from "reactstrap"
import { getCroppedImg } from './../../lib/canvasUtils'
import {connect} from "react-redux"
import { Root } from "../../../authServices/rootconfig"


class App extends React.Component {
  state = {
    imageSrc:"",
    crop: { x: 0, y: 0 },
    zoom: 1,
    aspect: 5 / 2,
    croppedImage : null,
    rotation : 0,
    blob : null,
    editdata : {
        text1 : "",
        text2 : "",
        text3 : "",
    },
    gameid : ""
  }

  onCropChange = crop => {
    this.setState({ crop })
  }

  onCropComplete =async (croppedArea, croppedAreaPixels) => {
    
    if(isNaN(croppedArea.x)){
      croppedArea.x = 0
    }
    if(isNaN(croppedArea.y)){
      croppedArea.y = 0
    }

    if(isNaN(croppedAreaPixels.x)){
      croppedAreaPixels.x = 0
    }
    if(isNaN(croppedAreaPixels.y)){
      croppedAreaPixels.y = 0
    }

    croppedAreaPixels.width = this.props.cropSize.width
    croppedAreaPixels.height = this.props.cropSize.height
    const croppedImage = await getCroppedImg(this.state.imageSrc,croppedAreaPixels,this.state.rotation,"newfile.png");
    this.setState({croppedImage : croppedImage.fileUrl,blob:croppedImage.blob});
  }

  onZoomChange = zoom => {
    this.setState({ zoom })
  }

  onFileChange = async( e )=> {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      let imageDataUrl = await this.readFile(file)
      this.setState({imageSrc :imageDataUrl ,blob :file })
    }
  }

  getRadianAngle =(degreeValue)=> {
    return (degreeValue * Math.PI) / 180
  }

   readFile = (file)=> {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result), false)
      reader.readAsDataURL(file)
    })
  }

  setRotationchange =(rotation)=>{
    this.setState({ rotation })
  }

  toggleModal = ()=>{
    this.props.modalflg(!this.props.modal)
  }

  cropfileupload= ()=>{
    // if(!this.state.blob){
    //   toast.error("please select img")
    // }else{
      this.props.modalflg(!this.props.modal)
      this.props.filedupload(this.state.blob,this.state.editdata,this.state.gameid);
    // }
  }


  componentDidUpdate(prevProps,prevState){
      if(this.props.editdata){
        if(this.props.editdata.data  && this.props.editdata.data !== prevState.editdata)
        {
            if(this.props.editdata.image){
                this.setState({editdata :this.props.editdata.data,imageSrc : Root.imageurl+this.props.editdata.image,gameid : this.props.editdata.game})
            }
        }

    }
  }

  onChange =(data,bool)=>{
        var newdata = this.state.editdata;
        newdata[bool] =data;
        this.setState({editdata : newdata});
  }
  
  render() {
    return (
      <Modal isOpen={this.props.modal}  toggle={this.toggleModal} className={`modal-dialog-centered modal-${this.props.size}`} fade={true}>
        <ModalHeader toggle={this.toggleModal}>
          Slider Upload
        </ModalHeader>
        <ModalBody>
          <Col md="12"  className="text-center">
            <CustomInput type="file" label="image select" id="fp_imgupload_logoimgssss" accept="image/*" onChange={this.onFileChange} name="fp_imgupload_logoimgssss" />
          </Col>
          {/* <Col md="12"  className="text-center">
          <div className="crop-container"style={{width:this.props.cropSize.width,height:this.props.cropSize.height}} >
              {
                this.state.imageSrc !== "" ?  
                <Cropper
                image={this.state.imageSrc}
                crop={this.state.crop}
                cropSize={{width: this.props.cropSize.width,height:this.props.cropSize.height}}
                zoom={this.state.zoom}
                aspect={this.props.aspect}
                onCropChange={this.onCropChange}
                onCropComplete={this.onCropComplete}
                onZoomChange={this.onZoomChange}
                onRotationChange={this.setRotationchange}
                rotation={this.state.rotation}
                /> :""
              }
            </div>
          </Col>
           */}
           <Col md="12" className="text-center mt-1">
            {
              this.state.imageSrc ? <img src={this.state.imageSrc}  style={{width:"100%",height:this.props.cropSize.height}} alt="Cropped" />: ""
            } 
           </Col>
          <Col md="12" className="mt-2">
            <FormGroup >
              <Label>Slider Text1</Label>
              <Input type="text"  placeholder="Slider Text1" value={this.state.editdata.text1} onChange={e => this.onChange(e.target.value,"text1")}
                required />
            </FormGroup>
          </Col>
          <Col md="12" >
            <FormGroup>
              <Label>Slider Text2</Label>
              <Input type="text" placeholder="Slider Text2" value={this.state.editdata.text2} 
                onChange={e => this.onChange(e.target.value,"text2")} required />
            </FormGroup>
          </Col>
          <Col md="12" >
            <FormGroup>
              <Label>Slider Text3</Label>
              <Input type="text" placeholder="Slider Text3" value={this.state.editdata.text3}
                onChange={e => this.onChange(e.target.value,"text3" )} required />
            </FormGroup>
          </Col>
          <Col md="12" >
            <FormGroup>
              <Label>Game Item Link : Enter Game ID</Label>
              <Input type="text" placeholder="Game Item Link" value={this.state.gameid}
                onChange={e => this.setState({gameid : e.target.value})} required />
            </FormGroup>
          </Col>
        </ModalBody>
        <ModalFooter className="text-center justify-content-center">
          <Button color="primary" onClick={()=>this.cropfileupload()}>{this.props.editdata ? "update" : "add"}</Button>
        </ModalFooter>
        </Modal>
    )
  }
}

const mapStopProps = (state)=>{
    return {allgames : state.gameproviders.providers.allgamedata}
}

export default connect(mapStopProps,{})(App)