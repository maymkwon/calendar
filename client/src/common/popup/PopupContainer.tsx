import React, { Component } from "react";
import { LayerPopup } from "../layerpopup";
import styled from "styled-components";

const ModalWrapper = styled.div`
  z-index: ${({ layerkey }) => layerkey};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 1280px;
  display: flex;
  align-items: center;

  .modal-content {
    position: absolute;
    left: 50%;
    width: ${({ popupWidth }) => (popupWidth ? `${popupWidth}px` : "540px")};
    margin-left: ${({ popupWidth }) =>
      popupWidth ? `-${popupWidth / 2}px` : "-270px"};
    height: auto;
    background-color: #fff;
    transform-origin: center center;
    box-shadow: 0 20px 30px 0 rgba(0, 0, 0, 0.15);
    border-radius: 3px;

    &__body {
      width: 100%;
      padding: 0 40px 40px;
      position: relative;

      &__buttons {
        position: absolute;
        bottom: 0;
        display: flex;
        align-items: center;
        bottom: 40px;
        left: 40px;
        right: 40px;

        button {
          flex: 1;
        }
      }
    }
    .modal-content__body.no-header {
      padding: 40px;
    }
    .popup-button-container {
      position: absolute;
      bottom: 0;
      display: flex;
      align-items: center;
      bottom: 40px;
      left: 40px;
      right: 40px;
    }
  }
`;

export const Dim = styled.div`
  z-index: ${({ layerkey }) => layerkey};
  background-color: rgba(0, 0, 0, 0.3);
  height: 100vh;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: fixed;
`;
interface Props {
  location: any;
  history: any;
  layerKey: any;
  layerCount: any;
  children: any;
  LayerPopup: any;
  popupWidth: any;
  position: any;
  fullpage: boolean;
}

class PopupContainer extends Component<Props> {
  componentWillUnmount() {
    document.body.style.overflow = "visible";
  }

  componentDidUpdate(prevProps, prevState) {
    document.body.style.overflow = "hidden";
  }

  componentDidMount() {
    document.body.style.overflow = "hidden";
  }

  onClickCancel = () => {
    this.props.LayerPopup.hide(this.props.layerKey);
  };

  render() {
    const newProps = {
      location: this.props.location,
      history: this.props.history,
      layerKey: this.props.layerKey,
      layerCount: this.props.layerCount,
      LayerPopup: LayerPopup
    };
    const screenHeight = window.innerHeight;
    const { popupWidth, position } = this.props;
    return (
      <React.Fragment>
        <ModalWrapper
          position={position}
          layerkey={this.props.layerKey}
          popupWidth={popupWidth}
          fullpage={this.props.fullpage}
        >
          <div className="modal-content">
            {React.cloneElement(this.props.children, newProps)}
          </div>
        </ModalWrapper>
        <Dim
          layercount={this.props.layerCount}
          screenheight={screenHeight}
          layerkey={this.props.layerKey - 1}
          // onClick={() => this.onClickCancel}
        />
      </React.Fragment>
    );
  }
}

export default PopupContainer;
