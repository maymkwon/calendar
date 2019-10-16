import React, { Component } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { SCArrowBtn, SCBasicBtn } from '../../style/Buttons';
import styled from 'styled-components';
import moment, { Moment as MomentType } from 'moment';
import { componentView } from '../../utils/constants';
import * as dateUtils from '../../utils/dates';
import cn from 'classnames';

const SCWrap = styled.div.attrs({ className: 'c-control dfacjsb' })`
  padding: 0 20px;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 999;
  .c-control {
    &__term {
      .basic-btn:first-child {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      .basic-btn:last-child {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
      .basic-btn + .basic-btn {
        border-left: 0;
      }
    }

    &__currnet {
      font-size: 24px;
      margin-left: 20px;
    }
  }
`;

interface Props {
  date: MomentType;
  view: string;
  onChangeDate: (string: string) => void;
  onSelectDate: (MomentType: MomentType) => void;
  onChangeView: (string: string) => void;
}

class Controls extends Component<Props> {
  render() {
    const { view, date, onChangeDate, onSelectDate, onChangeView } = this.props;
    const weekOfMonth = dateUtils.getWeekOfMonth(date);
    return (
      <SCWrap id="controls">
        <div className="dfac">
          <SCArrowBtn
            className="dfacjcc"
            size={50}
            onClick={() => onChangeDate('prev')}
          >
            <MdChevronLeft size={30} />
          </SCArrowBtn>
          <SCArrowBtn
            className="dfacjcc"
            size={50}
            onClick={() => onChangeDate('next')}
          >
            <MdChevronRight size={30} />
          </SCArrowBtn>
          <div
            className="c-control__currnet"
            role="button"
            onClick={() => onSelectDate(moment())}
          >
            {date.format('YYYY 년 MM 월')}
            {view === componentView.WEEK && (
              <span style={{ marginLeft: 10 }}>{weekOfMonth}주</span>
            )}
          </div>
        </div>

        <div className="c-control__term">
          <SCBasicBtn
            className={cn({ active: view === componentView.MONTH })}
            onClick={() => onChangeView(componentView.MONTH)}
          >
            월
          </SCBasicBtn>
          <SCBasicBtn
            className={cn({ active: view === componentView.WEEK })}
            onClick={() => onChangeView(componentView.WEEK)}
          >
            주
          </SCBasicBtn>
        </div>
      </SCWrap>
    );
  }
}

export default Controls;
