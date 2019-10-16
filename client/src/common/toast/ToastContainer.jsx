import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import TransitionGroup from "react-transition-group/TransitionGroup";
import ToastMessage from "./ToastMessage";
import FadeIn from "./FadeIn";

const Div = styled.div`
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99999;
`;

class ToastContainer extends Component {
  render() {
    const { toast } = this.props;
    return (
      <Div>
        <TransitionGroup appear>
          {toast.map((toast, i) => {
            return (
              <FadeIn keyProps={i} key={i} duration={300}>
                <ToastMessage title={toast.title} />
              </FadeIn>
            );
          })}
        </TransitionGroup>
      </Div>
    );
  }
}

const mapStateToProps = state => {
  return {
    toast: state.system.get("queue").toJS()
  };
};

export default connect(mapStateToProps)(ToastContainer);
