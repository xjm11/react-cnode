import React from 'react';

const UserLogin = (props) => {
  const userName = localStorage.getItem('userInfo') ;

  if (userName) {
    const allProps = {userName, ...props};
    return (
      <span>
        {props.children(allProps)}
      </span>
    );
  } else {
    return null;
  }
};

export default UserLogin;
