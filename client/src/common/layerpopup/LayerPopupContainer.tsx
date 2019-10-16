import React, { Component } from "react";
import { EventName } from "./EventName";
import { LayerKeyGen } from "./LayerKeyGen";
import { History } from "history";
interface Props {
  history: History;
}
interface State {
  reload: number;
}

interface LayerType<T> {
  [x: string]: any;
}
interface LayerProps {
  key: string;
  layerKey: string;
  location: object;
  history: object;
  layerCount: number;
}

class LayerPopupContainer extends Component<Props, State> {
  private layers: LayerType<LayerProps>;
  constructor(props) {
    super(props);
    this.fireLayerEvent = this.fireLayerEvent.bind(this);

    Object.keys(EventName).forEach((name, idx) => {
      document.addEventListener(name, this.fireLayerEvent, false);
    });

    this.state = {
      reload: 0
    };
    this.layers = {};
  }

  fireLayerEvent(evt) {
    if (evt.type === EventName.showLayer) {
      this.layers = {
        ...this.layers,
        [evt.detail.layerKey]: evt.detail.layerComponent
      };
    } else if (evt.type === EventName.hideLayer) {
      delete this.layers[evt.detail.layerKey];
    } else if (evt.type === EventName.clearLayer) {
      this.layers = {};
    }
    this.setState({ reload: this.state.reload + 1 });
  }

  componentDidUpdate(prevProps, prevState) {
    if (Object.keys(this.layers).length === 0) {
      LayerKeyGen.reset();
    }
  }

  render() {
    return (
      <React.Fragment>
        {Object.keys(this.layers).map((layerkey, i) => {
          let layerProps = {
            key: layerkey,
            layerkey,
            location: this.props.history.location,
            history: this.props.history,
            layercount: Object.keys(this.layers).length
          };
          if (this.layers[layerkey]) {
            if (typeof this.layers[layerkey] === "function") {
              return this.layers[layerkey](layerProps);
            } else {
              return React.cloneElement(this.layers[layerkey], layerProps);
            }
          } else {
            return null;
          }
        })}
      </React.Fragment>
    );
  }
}

export default LayerPopupContainer;
