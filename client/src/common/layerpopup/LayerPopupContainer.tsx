import React, { Component } from "react";
import { EventName } from "./EventName";
import { LayerKeyGen } from "./LayerKeyGen";
import PropTypes from "prop-types";
import { History } from "history";
interface Props {
  history: History;
}
interface State {
  reload: number;
}

class LayerPopupContainer extends Component<Props, State> {
  static contextTypes = {
    router: PropTypes.shape({
      route: PropTypes.object.isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.fireLayerEvent = this.fireLayerEvent.bind(this);

    Object.keys(EventName).forEach((name, idx) => {
      document.addEventListener(name, this.fireLayerEvent, false);
    });

    this.state = {
      reload: 0
    };
  }
  layers = {};

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
        {Object.keys(this.layers).map((layerKey, i) => {
          const { route } = this.context.router;
          let layerProps = {
            key: layerKey,
            layerKey,
            location: this.props.history.location,
            history: this.props.history,
            layerCount: Object.keys(this.layers).length
          };
          if (this.layers[layerKey]) {
            if (typeof this.layers[layerKey] === "function") {
              return this.layers[layerKey](layerProps);
            } else {
              return React.cloneElement(this.layers[layerKey], layerProps);
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
