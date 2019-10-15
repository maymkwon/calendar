import styled from 'styled-components'



export const ModalWrapper = styled.div`
  z-index: ${({ layerkey }) => layerkey};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 1280px;
  display: flex;
  align-items: center;

  .modal-content {
    position: absolute;
    left: 50%;
    width: ${({ popupWidth }) => (popupWidth ? `${popupWidth}px` : "540px")};
    margin-left: ${({ popupWidth }) =>
      popupWidth ? `-${popupWidth / 2}px` : "-270px"};
    height: auto;
    background-color: #fff;
    transform-origin: center center;
    box-shadow: 0 20px 30px 0 rgba(0, 0, 0, 0.15);
    border-radius: 3px;

    &__body {
      width: 100%;
      padding: 0 40px 40px;
      position: relative;

      &__buttons {
        position: absolute;
        bottom: 0;
        display: flex;
        align-items: center;
        bottom: 40px;
        left: 40px;
        right: 40px;

        button {
          flex: 1;
        }
      }
    }
    .modal-content__body.no-header {
      padding: 40px;
    }
    .popup-button-container {
      position: absolute;
      bottom: 0;
      display: flex;
      align-items: center;
      bottom: 40px;
      left: 40px;
      right: 40px;
    }
  }
`;

export const Dim = styled.div`
  z-index: ${({ layerkey }) => layerkey};
  background-color: rgba(0, 0, 0, 0.3);
  height: 100vh;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: fixed;
`;

export const SCPopupContainer = styled.div`
  margin: 0 20px;
  padding: 25px 0;
  h1 {
    border-bottom: 1px solid #eee;
    margin: 0;
    margin-bottom: 20px;
    padding-bottom: 15px;
  }
  .react-datepicker__input-container > input {
    padding: 10px;
    font-size: 14px;
  }
  .pop-header{
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
    padding-bottom: 15px;
  }
  .pop-select{
    display:flex;
    &.date{
      display:block;
    }
    margin-top: 20px;
    & > span{
      display:block
    }
    & > div{
      flex:1
    }
    & > div + div {
      margin-left:15px;
    }
    .label{
      display:block;
    }
  }

  .btn-box {
    margin-top: 20px;
    text-align:right;
    button {
      width: 80px;
    }
    button + button {
      margin-left: 10px;
    }
  }
`;