import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
  width:300px;
  padding: 20px;
  font-size:25px;
  background-color:black;
  color:#fff;
  text-align:center;
  
`

const ToastMessage = ({title, content}) => {
  return (
    <Container>
      <strong>{title}</strong>
      {/* <div>{content}</div> */}
    </Container>
  );
};

export default ToastMessage;