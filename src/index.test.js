import React from 'react';
import {shallow, mount} from 'enzyme';
import styled from 'styled-components';
import createComponentFromTagProp from '.';

describe('createComponentFromTag', () => {

  describe('component type', () => {

    it('should render a div when the default tag is not provided and the tag prop is not provided', () => {
      const ComponentFromTag = createComponentFromTagProp();
      const wrapper = shallow(<ComponentFromTag/>);
      expect(wrapper.type()).toBe('div');
    });

    it('should render an aside when the default tag is provided but the tag prop is not provided', () => {
      const ComponentFromTag = createComponentFromTagProp({tag: 'aside'});
      const wrapper = shallow(<ComponentFromTag/>);
      expect(wrapper.type()).toBe('aside');
    });

    it('should render a span when the default tag is not provided and the tag prop is provided', () => {
      const ComponentFromTag = createComponentFromTagProp();
      const wrapper = shallow(<ComponentFromTag tag="span"/>);
      expect(wrapper.type()).toBe('span');
    });

    it('should render a span when the default tag is provided and the tag prop is provided', () => {
      const ComponentFromTag = createComponentFromTagProp({tag: 'aside'});
      const wrapper = shallow(<ComponentFromTag tag="span"/>);
      expect(wrapper.type()).toBe('span');
    });

    it('should render an aside when the default tag is provided but the tag prop is not provided and the tag prop is named differently', () => {
      const ComponentFromTag = createComponentFromTagProp({tag: 'aside', prop: 'as'});
      const wrapper = shallow(<ComponentFromTag/>);
      expect(wrapper.type()).toBe('aside');
    });

    it('should render a span when the default tag is not provided and the tag prop is provided and the tag prop is named differently', () => {
      const ComponentFromTag = createComponentFromTagProp({prop: 'as'});
      const wrapper = shallow(<ComponentFromTag as="span"/>);
      expect(wrapper.type()).toBe('span');
    });

    it('should render a span when the default tag is provided and the tag prop is provided and the tag prop is named differently', () => {
      const ComponentFromTag = createComponentFromTagProp({tag: 'aside', prop: 'as'});
      const wrapper = shallow(<ComponentFromTag as="span"/>);
      expect(wrapper.type()).toBe('span');
    });

  });

  describe('component props', () => {

    it('should pass down other props', () => {
      const ComponentFromTag = createComponentFromTagProp();
      const wrapper = shallow(<ComponentFromTag title="Hello World!" disabled data-count={99}/>);
      expect(wrapper.prop('title')).toBe('Hello World!');
      expect(wrapper.prop('disabled')).toBe(true);
      expect(wrapper.prop('data-count')).toBe(99);
    });

    it('should omit the tag prop when the tag prop is not named differently', () => {
      const ComponentFromTag = createComponentFromTagProp();
      const wrapper = shallow(<ComponentFromTag tag="span"/>);
      expect(wrapper.prop('tag')).toBeUndefined();
    });

    it('should omit the tag prop when the tag prop is named differently', () => {
      const ComponentFromTag = createComponentFromTagProp({prop: 'as'});
      const wrapper = shallow(<ComponentFromTag as="span"/>);
      expect(wrapper.prop('as')).toBeUndefined();
    });

    it('should not omit when they have not been specified', () => {
      const ComponentFromTag = createComponentFromTagProp({propsToOmit: ['bold', 'italic', 'color', 'width']});
      const wrapper = shallow(<ComponentFromTag title="Hello World!" disabled data-count={99}/>);
      expect(wrapper.prop('title')).toBe('Hello World!');
      expect(wrapper.prop('disabled')).toBe(true);
      expect(wrapper.prop('data-count')).toBe(99);
    });

    it('should omit when they have been specified', () => {
      const ComponentFromTag = createComponentFromTagProp({propsToOmit: ['bold', 'italic', 'color', 'width']});
      const wrapper = shallow(<ComponentFromTag bold italic color="green" width="max"/>);
      expect(wrapper.prop('bold')).toBeUndefined();
      expect(wrapper.prop('italic')).toBeUndefined();
      expect(wrapper.prop('width')).toBeUndefined();
    });

  });

  describe('demo', () => {

    it('should pass', () => {

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

      const wrapper = mount(
        <article>
          <Text as="h2" size={32} italic title="titletest">Contact Us</Text>
          <form>
            <Text as="label" size={10} bold htmlFor="name">Name</Text>
            <input id="name"/>
          </form>
        </article>
      );

      const h2 = wrapper.find('h2').first();
      expect(h2.length).toBe(1);
      expect(h2.prop('as')).toBeUndefined();
      expect(h2.prop('size')).toBeUndefined();
      expect(h2.prop('italic')).toBeUndefined();
      expect(h2.prop('title')).toBe('titletest');

      const label = wrapper.find('label').first();
      expect(label.length).toBe(1);
      expect(label.prop('as')).toBeUndefined();
      expect(label.prop('size')).toBeUndefined();
      expect(label.prop('bold')).toBeUndefined();
      expect(label.prop('htmlFor')).toBe('name');

    });

  });

});