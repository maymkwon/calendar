import React from 'react';
import styled from 'styled-components'

const Container = styled.div`
  width:200px;
  padding: 0.7rem 1rem;
  font-size:14px;
  background-color:black;
  color:#fff;
  
`

const ToastMessage = ({title, content}) => {
  return (
    <Container>
      <strong>{title}</strong>
      <div>{content}</div>
    </Container>
  );
};

export default ToastMessage;