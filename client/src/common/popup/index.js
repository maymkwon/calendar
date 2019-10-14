import React from "react";
import { LayerPopup } from "../../library/layerpopup";
import LayerContainer from "./LayerContainer";
import PopupContainer from "./PopupContainer";

export default class Popup {
  static modal(LayerPageComponent) {
    return LayerPopup.show(
      <LayerContainer>{LayerPageComponent}</LayerContainer>
    );
  }

  static datePacker(props) {
    return LayerPopup.show(<PopupContainer>aaa</PopupContainer>);
  }

  static hide(layerKey) {
    if (layerKey) {
      LayerPopup.hide(layerKey);
    }
  }
}
