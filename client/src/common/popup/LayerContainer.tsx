import React, { Component, ReactNode } from "react";
import styled from "styled-components";

const LayerWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  overflow-y: auto;
  z-index: ${props => props.layerkey};
  background-color: rgba(0, 0, 0, 0.3);

  .layer-content {
    width: 50%;
    margin: 0 auto;
    height: ${props => props.screenheight / 2 + "px"};
    min-width: 450px;
    background: #fff;
  }
`;

interface Props {
  location: any;
  history: any;
  layerKey: any;
  layerCount: any;
  children: any;
}

class LayerContainer extends Component<Props> {
  componentDidMount() {
    document.body.classList.add("non-scroll");
  }
  componentWillUnmount() {
    document.body.classList.remove("non-scroll");
  }
  componentDidUpdate(prevProps, prevState) {
    document.body.classList.add("non-scroll");
  }
  render() {
    const screenHeight = window.innerHeight;
    const newProps = {
      location: this.props.location,
      history: this.props.history,
      layerKey: this.props.layerKey,
      layerCount: this.props.layerCount
    };

    return (
      <LayerWrapper layerkey={this.props.layerKey}>
        <div
          className="layer-content"
          style={{ height: screenHeight / 2 + "px" }}
        >
          {React.cloneElement(this.props.children, { ...newProps })}
        </div>
      </LayerWrapper>
    );
  }
}

export default LayerContainer;
