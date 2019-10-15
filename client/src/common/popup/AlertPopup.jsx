import React, { Component } from "react";
import { SCBasicBtn } from "../../style/Buttons";
import { SCPopupContainer } from "../../style/SCPopup";


class AlertPopup extends Component {
  handleClose = () => {
    this.props.layerpopup.hide(this.props.layerkey);
  };

  render() {
    return (
      <SCPopupContainer>
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
      </SCPopupContainer>
    );
  }
}

export default AlertPopup;
