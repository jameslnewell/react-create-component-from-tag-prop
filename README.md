# react-create-component-from-tag-prop

Create a `react` component from a `tag` prop.

Lets your users to choose which HTML elements get styled by your 💅 `styled-components`.

> Note: This utility is a handy escape hatch for 💅 `styled-components`, but also consider whether you could use [mixins](https://github.com/styled-components/styled-components/blob/master/docs/tips-and-tricks.md#using-javascript-to-our-advantage) instead.

## Installation

```bash
npm install --save react-create-component-from-tag-prop
```

## Usage

`Text.jsx`
```js
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import createComponentFromTagProp from 'react-create-component-from-tag-prop';

const TextFromTagProp = createComponentFromTagProp({
  tag: 'p',
  prop: 'as',
  propsToOmit: ['size', 'bold', 'italic']
});

const Text = styled(TextFromTagProp)`
  font-size: ${({size}) => size && `${size}px` || '12px'};
  font-weight: ${({bold}) => bold && 'bold' || 'normal'};
  font-style: ${({italic}) => italic && 'italic' || 'normal'};
`;

Text.propTypes = {
  as: PropTypes.oneOf([
    'p', 'span', 'label', 
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
  ]),
  size: PropTypes.number,
  bold: PropTypes.boolean,
  italic: PropTypes.boolean
}

export default Text;

```

`ContactPage.jsx`
```js
import React from 'react';
import Text from './Text';

export default () => (
  <article>
    <Text as="h2" size={32} italic>Contact Us</Text>
    <form>
      <Text as="label" size={10} bold htmlFor="name">Name</Text>
      <input id="name"/>
    </form>
  </article>
);

```

## Change log

### 1.2.0

- add: added escape hatch note

### 1.1.0

- add: updated `Usage` docs showing an example of limiting tags via `prop-types`

### 1.0.2-3

- fix: stop `npm` ignoring `./dist` files

### 1.0.1

- fix: mistake in the `Usage` example
