import React, { Component } from 'react';
import {connect} from 'react-redux'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import styled from 'styled-components'
import 'react-datepicker/dist/react-datepicker.css'
import { SCBasicBtn } from '../../style/Buttons';
import Popup from '.';

const Container = styled.div`
  margin: 0 20px;
  padding: 25px 0;
  h1{
    border-bottom: 1px solid #eee;
    margin:0;
    margin-bottom:20px;
    padding-bottom:15px;

  }
  .react-datepicker__input-container > input{
    padding:10px;
    font-size:14px;
  }
  .btn-box{
    margin-top: 20px;
    button{
      width:80px;
    }
    button + button {
      margin-left:10px
    }
  }
`

class AlertPopup extends Component {
  handleClose = () => {
    this.props.layerpopup.hide(this.props.layerkey)
  }
  
  render() {
    return (
      <Container>
        <div>
          <h1>ALERT</h1>
        </div>
        <div>
          <p>{this.props.message}</p>
        </div>
        <div className="btn-box">
          <SCBasicBtn className="green" onClick={this.handleClose}>
            확인
          </SCBasicBtn>
          
        </div>
      </Container>
    );
  }
}



export default AlertPopup;