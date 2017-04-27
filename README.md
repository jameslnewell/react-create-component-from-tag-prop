# react-create-component-from-tag-prop

Create a `react` component from a `tag` prop.

Lets your users to choose which HTML elements get styled by your 💅 `styled-components`.

## Installation

```bash
npm install --save react-create-component-from-tag-prop
```

## Usage

`Text.jsx`
```js
import createComponentFromTagProp from 'react-create-component-from-tag-prop';

const TextFromTagProp = createComponentFromTagProp({
  tag: 'p',
  prop: 'as',
  propsToOmit: ['size', 'bold', 'italic']
});

export default styled(TextFromTagProp)`
  font-size: ${({size}) => `${size}px` || '12px'};
  font-weight: ${({bold}) => bold && 'bold' || 'normal'};
  font-style: ${({italic}) => italic && 'italic' || 'normal'};
`;

```

`ContactPage.jsx`
```js
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