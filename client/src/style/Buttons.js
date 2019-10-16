import styled from 'styled-components';

const DefaultButton = styled.button`
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: normal;
  -webkit-font-smoothing: inherit;
  -moz-oxs-font-smoothing: inherit;
  -webkit-appearance: none;
  outline: none;
`;

export const SCArrowBtn = styled(DefaultButton)`
  width: ${({ size }) => (!size ? 30 : size)}px;
  height: ${({ size }) => (!size ? 30 : size)}px;

  &:hover:not(:disabled) {
    background-color: #eee;
  }
`;

export const SCBasicBtn = styled(DefaultButton).attrs({
  className: 'basic-btn'
})`
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #eee;
  padding: 7px 12px;
  text-align: center;

  &:hover:not(:disabled) {
    background-color: #eee;
  }
  &.red {
    background-color: #ff2659;
    color: #fff;
    &:hover {
      background-color: rgba(255, 38, 89, 0.7);
    }
  }
  &.green {
    background-color: #00ad48;
    color: #fff;
    &:hover {
      background-color: rgba(0, 173, 72, 0.7);
    }
  }
`;
