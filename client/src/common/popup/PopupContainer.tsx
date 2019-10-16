import React, { Component, useEffect } from "react";
import { LayerPopup } from "../layerpopup";
import { ModalWrapper, Dim } from "../../style/SCPopup";

interface Props {
  location: any;
  history: any;
  layerkey: any;
  layercount: any;
  children: React.ReactElement;
  popupWidth: any;
  position: any;
}

const PopupContainer = (props: Props) => {
  const newProps = {
    location: props.location,
    history: props.history,
    layerkey: props.layerkey,
    layercount: props.layercount,
    layerpopup: LayerPopup
  };
  const screenHeight = window.innerHeight;
  const { popupWidth, position } = props;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  });

  return (
    <React.Fragment>
      <ModalWrapper
        position={position}
        layerkey={props.layerkey}
        popupWidth={popupWidth}
      >
        <div className="modal-content">
          {React.cloneElement(props.children, newProps)}
        </div>
      </ModalWrapper>
      <Dim
        layercount={props.layercount}
        screenheight={screenHeight}
        layerkey={props.layerkey - 1}
      />
    </React.Fragment>
  );
};

export default PopupContainer;
