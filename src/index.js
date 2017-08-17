import React from 'react';
import pickBy from 'lodash/pickBy';

export default ({tag: defaultTag = 'div', prop = 'tag', propsToOmit = []} = {}) => {
  return ({children, ...otherProps}) => {
    const tag = otherProps[prop] || defaultTag;
    const omitPropsKeys = [prop, ...propsToOmit];
    const props = pickBy(otherProps, (value, key) => {
      return omitPropsKeys.indexOf(key) === -1;
    });

    return React.createElement(tag, props, children);
  };
};
