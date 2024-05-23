import React from 'react';
// import { shallow } from 'enzyme';
import { EmailViewBase } from '../view';

describe('EmailView', () => {
  it('should render correctly with email', () => {
    // const component = shallow(<EmailViewBase email="some@email.com" />);
    const component = <EmailViewBase email="some@email.com" />;

    expect(component).toMatchSnapshot();
  });

  it('should render correctly without email', () => {
    // const component = shallow(<EmailViewBase email="" />);
    const component = <EmailViewBase email="" />;

    expect(component).toMatchSnapshot();
  });
});