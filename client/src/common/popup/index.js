import React from "react";
import { LayerPopup } from "../layerpopup";
import PopupContainer from "./PopupContainer";
import CreateEventPopup from "./CreateEventPopup";
import DetailEventPopup from "./DetailEventPopup";
import AlertPopup from "./AlertPopup";

export default class Popup {
  static alert(props) {
    return LayerPopup.show(
      <PopupContainer>
        <AlertPopup {...props} />
      </PopupContainer>
    );
  }
  static createEventPopup(props) {
    return LayerPopup.show(
      <PopupContainer>
        <CreateEventPopup {...props} />
      </PopupContainer>
    );
  }
  static detailEventPopup(props) {
    return LayerPopup.show(
      <PopupContainer>
        <DetailEventPopup {...props} />
      </PopupContainer>
    );
  }

  static hide(layerkey) {
    if (layerkey) {
      LayerPopup.hide(layerkey);
    }
  }
}
