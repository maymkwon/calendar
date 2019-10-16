import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SCBasicBtn } from "../../style/Buttons";
import { SCPopupContainer } from "../../style/SCPopup";
import { SCInput } from '../../style/SCInputStyle';
import cn from 'classnames'
import * as dateUtils from '../../utils/dates';
import {FORMATS}from '../../utils/constants';
import Select from 'react-select';
import Popup from '.';
import moment from 'moment';



const timeOption = dateUtils.getHourOption();

class DetailEventPopup extends Component {
  state = {
    isEdit: false,
    startDate: null,
    title: "",
    startTimeOption: null,
    endTimeOption: null,
    eventState: {
      
    },
  };

  handleClose = () => {
    this.props.layerpopup.hide(this.props.layerkey);
  };
  setDate = date => {
    this.setState({ startDate: date });
  };
  handleChangeDate = date => {
    this.setDate(date);
  };
  handleChangeText = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleChangeTime = (selectOption, action) => {
    this.setState({ [action.name]: selectOption });
  };

  toggleEdit = () => {
    this.setState({ isEdit: !this.state.isEdit }, () => this.setDetail());
  };
  
  setDetail = () => {
    const { event } = this.props;
    let startDate = (event.start);
    let startTimeOption = timeOption[moment(event.start).hours()];
    let endTimeOption = timeOption[moment(event.end).hours()];
    this.setState({
      startDate, 
      title: event.title,
      startTimeOption,
      endTimeOption
    });
  };

  submit = () => {
    const { title, startDate, startTimeOption, endTimeOption } = this.state;
    if (title.trim().length === 0) {
      Popup.alert({ message: '제목을 입력해 주세요' });
      return;
    }
    if ((startTimeOption === null, endTimeOption === null)) {
      Popup.alert({ message: '시작 / 종료 시간을 선택해 주세요' });
      return;
    }
    let origin = moment(startDate).toDate();
    const start = origin.setHours(startTimeOption.value);
    const end = origin.setHours(endTimeOption.value);
    let data = {
      id:this.props.event.id,
      title,
      start,
      end
    };
    if (start > end || start > end) {
      Popup.alert({ message: '종료시간이 시작시간 보다 빠를 수 없습니다.' });
      return;
    }
    this.props.updateEvent(data, this.handleClose);
  };

  handleDelete = e => {
    e.preventDefault();
    const { event } = this.props;
    let data = {
      id: event.id
    };
    this.props.deleteEvent(data, this.handleClose);
  };
  render() {
    const { event } = this.props;
    const { isEdit, startTimeOption, endTimeOption } = this.state;
    const { title } = event;
    return (
      <SCPopupContainer>
        <div className="pop-header">
          {isEdit ? (
            <SCInput
              className="header"
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChangeText}
              placeholder="제목을 입력해 주세요"
            />
          ) : (
            <h1>{title}</h1>
          )}
        </div>
        {isEdit && (
          <React.Fragment>
            <div className="pop-select date">
              <span className="label">시작일</span>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChangeDate}
                dateFormat="yyyy/MM/dd "
              />
            </div>
            <div className="pop-select">
              <div>
                <span className="label">시작 시간</span>
                <Select
                  value={startTimeOption}
                  name="startTimeOption"
                  onChange={this.handleChangeTime}
                  options={timeOption}
                />
              </div>
              <div>
                <span className="label">종료 시간</span>
                <Select
                  value={endTimeOption}
                  name="endTimeOption"
                  onChange={this.handleChangeTime}
                  options={timeOption}
                />
              </div>
            </div>
          </React.Fragment>
        )}
        {!isEdit && (
          <div style={{margin:'20px'}}>
            일정 : {' '}
            {moment(event.start).format(FORMATS.YMDH)}시 ~{' '}
            {moment(event.end).format(FORMATS.YMDH)}시
          </div>
        )}
        <div className="btn-box">
          {!isEdit && (
            <React.Fragment>
              <SCBasicBtn className="green" onClick={this.handleClose}>
                닫기
              </SCBasicBtn>
              <SCBasicBtn className="red" onClick={this.handleDelete}>
                삭제
              </SCBasicBtn>
            </React.Fragment>
          )}

          <SCBasicBtn className={cn({ red: isEdit })} onClick={this.toggleEdit}>
            {!isEdit ? '수정' : '취소'}
          </SCBasicBtn>
          {isEdit && (
            <SCBasicBtn className="green" onClick={this.submit}>
              수정 완료
            </SCBasicBtn>
          )}
        </div>
      </SCPopupContainer>
    );
  }
}

export default DetailEventPopup;
