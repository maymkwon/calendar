import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { SCBasicBtn } from "../../style/Buttons";
import Popup from ".";
import { updateEvent } from "../../store/calendar/action";
import { SCPopupContainer } from "../../style/SCPopup";

class DetailEventPopup extends Component {
  handleClose = () => {
    this.props.layerpopup.hide(this.props.layerkey);
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleUpdate = () => {
    const { event } = this.props;
    const { title } = this.state;

    let data = {
      ...event,
      title
    };
    this.props.updateEvent(data, this.handleClose);
  };

  handleDelete = e => {
    e.preventDefault();
    const { event } = this.props;
    let data = {
      id: event.id
    };
    console.log(data);
    this.props.deleteEvent(data, this.handleClose);
  };
  render() {
    const { event } = this.props;
    const { title } = event;
    return (
      <SCPopupContainer>
        <div>
          <h1>{title}</h1>
        </div>
        <div>
          {/* <p>{this.props.message}</p> */}
          <input type="text" name="title" onChange={this.handleChange} />
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
      </SCPopupContainer>
    );
  }
}

export default DetailEventPopup;
