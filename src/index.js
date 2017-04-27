import React from 'react';
import omit from 'lodash.omit';

export default ({tag: defaultTag = 'div', prop = 'tag', propsToOmit = []} = {}) => {
  return ({children, ...otherProps}) => {
    const tag = otherProps[prop] || defaultTag;
    const props = omit(otherProps, [prop, ...propsToOmit]);
    return React.createElement(tag, props, children);
  };
};
