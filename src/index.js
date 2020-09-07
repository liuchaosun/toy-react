import React from './react';

class MyComponent extends React.Component {
  render() {
    return (
      <div>
        <div>myComponent</div>
        {this.children}
      </div>
    );
  }
}

React.render(
  <MyComponent id="a">
    <div></div>
    <div>asasas</div>
    <div></div>
  </MyComponent>,
  document.body
);
