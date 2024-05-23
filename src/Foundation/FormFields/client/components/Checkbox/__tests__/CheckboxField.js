import React from 'react';
import { shallow } from 'enzyme';
import { CheckboxField } from '../CheckboxField';

describe('CheckboxField', () => {
  it('should render correctly', () => {
    const component = shallow(<CheckboxField />);

    expect(component).toMatchSnapshot();
  });
});