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

class CreateEventPopup extends Component {
  state = {
    startDate: null,
    title:''
  }
   handleClose = () => {
    this.props.layerpopup.hide(this.props.layerkey)
  }
  setDate = (date) => {
    this.setState({startDate:date})
  }
  handleChangeDate = (date) => {
    this.setDate(date)
  }
  handleChangeText = (e) => {
    const {name, value} = e.target

    this.setState({[name]:value})
  }

  submit = () => {
    const {title, startDate} = this.state
    if(title.trim().length === 0){
      Popup.alert({message: '제목을 입력해 주세요'})
      return;
    } 
    let origin = moment(startDate)
    let data = {
      title,
      start: origin.format('x') *1,
      end:origin.add(1, 'hour').format('x')*1
    }
    this.props.createFunc(data, this.handleClose)
  }

  componentDidMount() {
    const {date } = this.props
    if(date){
      this.setDate(date.toDate())
    } 
  }
  render() {
    return (
      <Container>
        <div>
          <h1>일정 등록</h1>
        </div>
        <input type="text" name="title" onChange={this.handleChangeText}/>
        <DatePicker 
          selected={this.state.startDate} 
          onChange={this.handleChangeDate}
          dateFormat="yyyy/MM/dd h:mm aa" 
          timeCaption="time" 
          timeIntervals={60} 
          timeFormat="hh:mm aa" 
          showTimeSelect
        />
        <div className="btn-box">
          <SCBasicBtn className="green" onClick={this.submit}>
            등록
          </SCBasicBtn>
          <SCBasicBtn onClick={this.handleClose}>
            취소
          </SCBasicBtn>
        </div>
      </Container>
    );
  }
}


const mapStateToProps = (state) => ({
  eventData: state.calendar.events
})


export default connect(mapStateToProps)(CreateEventPopup);