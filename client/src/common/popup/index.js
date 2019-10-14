import React from "react";
import { LayerPopup } from "../layerpopup";
import PopupContainer from "./PopupContainer";
import CreateEventPopup from "./CreateEventPopup";
import AlertPopup from "./AlertPopup";

export default class Popup {
  

  static modal(props) {
    return LayerPopup.show(<PopupContainer><DIV/></PopupContainer>);
  }
  static alert(props) {
    return LayerPopup.show(<PopupContainer><AlertPopup {...props}/></PopupContainer>);
  }
  static createEventPopup(props) {
    return LayerPopup.show(<PopupContainer><CreateEventPopup {...props}/></PopupContainer>);
  }

  static hide(layerkey) {
    if (layerkey) {
      LayerPopup.hide(layerkey);
    }
  }
}


const DIV = () => {
  return (
    <div>
      aaa
    </div>
  );
};

