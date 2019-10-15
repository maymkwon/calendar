import styled, { css } from 'styled-components';

export const CView = styled.div.attrs({ className: 'c-view' })`
  position: relative;
  display: flex;
  flex-direction: ${({ direction }) => (direction ? direction : 'column')};
  .c-view {
  }
  .c-view__header {
    .c-day:first-child {
      color: red;
    }
    .c-day:last-child {
      color: blue;
    }
  }
`;

export const CWeek = styled.div.attrs({ className: 'c-week' })`
  display: flex;
  .c-day {
    flex: 1 0 120px;
    padding: 5px;
  }

  &.c-view__header {
    position: sticky;
    top: 51px;
    background: #fff;
    z-index: 999;
    
  }

  & + & {
    border-top: 1px solid #eee;
  }
  &:last-child {
    border-bottom: 1px solid #eee;
  }
`;

export const CDay = styled.div.attrs({ className: 'c-day' })`
  .c-view__header & {
    text-align: center;
    height: auto;
  }

  &.c-day {
    &__prevnext-day {
      opacity: 0.7;
    }
    &.today strong {
      background-color: red;
      color: #fff;
    }
    &.selected {
      background-color: #ddd;
    }
  }
  strong {
    width: 30px;
    height: 30px;
    border-radius: 100%;
  }

  & + & {
    border-left: 1px solid #eee;
  }
`;

export const CDayCol = styled.div.attrs({ className: 'c-day-col' })`
  display: flex;
  flex-direction: column;
  flex: 1 0 120px;
  &.timeslot-col {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 150px;
  }
  &.timeslot-col + &.c-day-col {
    border-left: 0;
  }
  & + & {
    border-left: 1px solid #eee;
  }
`;
export const CDayTime = styled.div.attrs({ className: 'c-day-col__time' })`
  position: relative;
  display: flex;
  flex-direction: column;
  height: ${({view}) => view === 'week' ? 50 : 120}px;
  
  & + &,
  &:first-child {
    border-top: 2px solid #eee;
  }
  &:last-child {
    border-bottom: 1px solid #eee;
  }
  &.timeslot-item {
    height: ${({ length }) => `calc(100% / ${length})`};
    strong {
      position: absolute;
      top: -12px;
      right: 20px;
      left: 0;
      text-align: right;
      background-color: #fff;
      padding: 0 10px;
    }
  }
`;
