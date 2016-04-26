import React, { Component, PropTypes } from 'react';
import { toArrayChildren } from './utils';
import assign from 'object-assign';

class Thumb extends Component {
  constructor() {
    super(...arguments);
    [
      'getDefaultThumb',
    ].forEach((method) => this[method] = this[method].bind(this));

  }

  getDefaultThumb() {
    const children = [];
    for (let i = 0; i < this.props.length; i++) {
      children.push(<li  key={i} />);
    }
    return children;
  }

  render() {
    let className = this.props.className;
    const defaultClass = `${className}-default`;
    className = `${className} ${this.props.prefixCls || ''}`.trim();
    className = !this.props.default ? className : `${className} ${defaultClass}`.trim();
    const children = this.props.default ? this.getDefaultThumb() : this.props.children;
    const childToRender = toArrayChildren(children).map((item, i) => {
      const props = assign({}, item.props);
      props.onClick = this.props.thumbClick.bind(this, i);
      props.className = `${props.className} ${this.props.active === i ? 'active' : ''}`.trim();
      return React.cloneElement(item, props);
    });
    return (<ul className={className}>
      {childToRender}
    </ul>);
  }
}

Thumb.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
  className: PropTypes.string,
  prefixCls: PropTypes.string,
  component: PropTypes.any,
  thumbClick: PropTypes.func,
  default: PropTypes.bool,
  length: PropTypes.number,
  active: PropTypes.number,
};
Thumb.defaultProps = {
  component: 'div',
  className: 'banner-anim-thumb',
};


export default Thumb;