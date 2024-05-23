import React from 'react';
import HeaderContent from './Header';

class LayoutHeader extends React.Component {
  state = {
    isRendered: false,
  };

  componentDidMount() {
    this.setState({isRendered: true});
  }

  render() {
    if (!this.state.isRendered) {
      return null;
    }

    return (
      <HeaderContent />
    );
  }
}

export default LayoutHeader;