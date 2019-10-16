import React from 'react';
import { mount } from 'enzyme';
import { shallow } from 'enzyme';

import Controls from '../../calendar/components/Controls';
import moment from 'moment';

describe('<Controls /> 컴포넌트', () => {
  it('마운트 컴포넌트', () => {
    let date = moment('2019-10-16');
    let view = 'month';

    const wrapper = mount(<Controls date={date} view={view} />);
    expect(wrapper.props().date).toBe(date);
    expect(wrapper.props().view).toBe(view);
  });
  it('렌더 컴포넌트', () => {
    let date = moment('2019-10-16');

    const wrapper = shallow(<Controls date={date} />);
    const render = wrapper.render();

    expect(render.find('.c-control__currnet').text()).toBe(
      date.format('YYYY 년 MM 월')
    );
  });
});
