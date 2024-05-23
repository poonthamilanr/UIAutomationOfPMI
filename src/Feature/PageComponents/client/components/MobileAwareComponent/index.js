import React from 'react';
import debounce from 'lodash/debounce';

const BREAKPOINT_WIDTH = 768;

class MobileAwareComponent extends React.PureComponent {
  _isMounted = false;

  state = {
    width: window.innerWidth,
  };

  isMobile = () => {
    return this.state.width < BREAKPOINT_WIDTH;
  };

  updateWidth = debounce(() => {
    if (this._isMounted) {
      this.setState({ width: window.innerWidth });
    }
  }, 25);

  componentDidMount() {
    this._isMounted = true;
    this.setState({ width: window.innerWidth });
    window.addEventListener('resize', this.updateWidth);
  }

  componentWillUnmount() {
    window.addEventListener('resize', this.updateWidth);
    this._isMounted = false;
  }
}

export default MobileAwareComponent;
