import React from "react";
import { Transition } from "react-transition-group";

const defaultDuration = 300;
let defaultStyle = {
  transition: `all ${defaultDuration}ms ease-in-out`,
  opacity: 0,
  transform: "translateX(0)"
};
let directionStyle = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0, transform: "translateX(100%)" },
  exited: { opacity: 0 }
};

const FadeIn = ({
  keyProps,
  inProps,
  duration = defaultDuration,
  children,
  style,
  ...rest
}) => {
  return (
    <Transition
      key={keyProps}
      in={rest.in}
      timeout={duration || defaultDuration}
      appear
      unmountOnExit
    >
      {status => {
        return (
          <div style={{ ...defaultStyle, ...style, ...directionStyle[status] }}>
            {children}
          </div>
        );
      }}
    </Transition>
  );
};

export default FadeIn;
