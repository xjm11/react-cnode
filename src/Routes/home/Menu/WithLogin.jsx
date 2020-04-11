import React from 'react';

const withLogin = (Component) => {
  const NewComponent = (props) => {
    if (localStorage.getItem('cnodeToken')) {
      return <Component {...props} />;
    } else {
      return null;
    }
  }

  return NewComponent;
};