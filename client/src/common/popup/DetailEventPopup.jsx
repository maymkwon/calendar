import React, { Component } from 'react';
import {connect} from 'react-redux'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import styled from 'styled-components'
import 'react-datepicker/dist/react-datepicker.css'
import { SCBasicBtn } from '../../style/Buttons';
import Popup from '.';
import { updateEvent } from '../../store/calendar/action';

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

class DetailEventPopup extends Component {
  handleClose = () => {
    this.props.layerpopup.hide(this.props.layerkey)
  }

  handleChange=(e)=> {
    const {name,value} = e.target
    this.setState({[name]: value})
  }

  handleUpdate = () => {
    const {event} = this.props
    const {title} = this.state

    let data = {
      ...event,
      title
    }
    this.props.updateEvent(data, this.handleClose)
  }

  handleDelete = (e) => {
    e.preventDefault()
    const {event} = this.props
    let data = {
      id: event.id
    }
    console.log(data)
    this.props.deleteEvent(data, this.handleClose)
  }
  render() {
    const {event} = this.props
    const {title} = event
    return (
      <Container>
        <div>
          <h1>{title}</h1>
        </div>
        <div>
          {/* <p>{this.props.message}</p> */}
          <input type="text" name="title" onChange={this.handleChange}/>
        </div>
        <div className="btn-box">
          <SCBasicBtn className="green" onClick={this.handleClose}>
            확인
          </SCBasicBtn>
          <SCBasicBtn className="green" onClick={this.handleDelete}>
            삭제
          </SCBasicBtn>
          <SCBasicBtn className="green" onClick={this.handleUpdate}>
            수정
          </SCBasicBtn>
          
        </div>
      </Container>
    );
  }
}



export default DetailEventPopup;