import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import moment from "moment";
import { SCBasicBtn } from "../../style/Buttons";
import Popup from ".";
import { SCPopupContainer } from "../../style/SCPopup";
import { SCInput } from "../../style/SCInputStyle";
import Select from "react-select";
import * as dateUtils from "../../utils/dates";
import "react-datepicker/dist/react-datepicker.css";

const timeOption = dateUtils.getHourOption();

class CreateEventPopup extends Component {
  state = {
    startDate: null,
    title: "",
    startTimeOption: timeOption[moment().hours()],
    endTimeOption: null
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

  submit = () => {
    const { title, startDate, startTimeOption, endTimeOption } = this.state;
    if (title.trim().length === 0) {
      Popup.alert({ message: "제목을 입력해 주세요" });
      return;
    }
    if ((startTimeOption === null, endTimeOption === null)) {
      Popup.alert({ message: "시작 / 종료 시간을 선택해 주세요" });
      return;
    }
    let origin = moment(startDate).toDate();
    const start = origin.setHours(startTimeOption.value);
    const end = origin.setHours(endTimeOption.value);
    let data = {
      title,
      start,
      end
    };
    if (start > end || start > end) {
      Popup.alert({ message: "종료시간이 시작시간 보다 빠를 수 없습니다." });
      return;
    }
    this.props.createFunc(data, this.handleClose);
  };

  componentDidMount() {
    const { date } = this.props;
    if (date) {
      this.setDate(date.toDate());
    }
  }

  render() {
    const { startTimeOption, endTimeOption } = this.state;
    return (
      <SCPopupContainer>
        <div className="pop-header">
          <SCInput
            className="header"
            type="text"
            name="title"
            onChange={this.handleChangeText}
            placeholder="제목을 입력해 주세요"
          />
        </div>
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
        {/* <Select value={selectOption} name="endTime" onChange={this.handleChangeEndTime} options={timeOption}/> */}
        <div className="btn-box">
          <SCBasicBtn className="green" onClick={this.submit}>
            등록
          </SCBasicBtn>
          <SCBasicBtn onClick={this.handleClose}>취소</SCBasicBtn>
        </div>
      </SCPopupContainer>
    );
  }
}

const mapStateToProps = state => ({
  eventData: state.calendar.events
});

export default connect(mapStateToProps)(CreateEventPopup);
