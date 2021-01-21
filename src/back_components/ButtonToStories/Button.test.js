import React from 'react';
import renderer from 'react-test-renderer';
import Button from './Button';

test('Button tested', () => {
  const component = renderer.create(
    <Button status={'primary'}/>,
  );
  
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});