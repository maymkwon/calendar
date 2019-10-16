import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 300px;
  padding: 20px;
  font-size: 25px;
  background-color: black;
  color: #fff;
  text-align: center;
  margin: 5px 0;
`;

const ToastMessage = ({ title }) => {
  return (
    <Container>
      <strong>{title}</strong>
    </Container>
  );
};

export default ToastMessage;
