import React from 'react';

function omitKeys(keys, object) {
  return Object.keys(object).reduce((cleanObject, key) => {
    if (keys.includes(key)) {
      return cleanObject;
    } else {
      return {
        ...cleanObject,
        [key]: object[key]
      };
    }
  }, {});
}

export default ({tag: defaultTag = 'div', prop = 'tag', propsToOmit = []} = {}) => {
  return ({children, ...otherProps}) => {
    const tag = otherProps[prop] || defaultTag;
    const omitPropsKeys = [prop, ...propsToOmit];
    const props = omitKeys(omitPropsKeys, otherProps);
    return React.createElement(tag, props, children);
  };
};
