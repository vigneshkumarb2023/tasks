import React from 'react';7
const Auth = (Wrap) => {
  return ({isAuth,...props})=>
  {
    if(!isAuth){
        return <p>
            access denied
        </p>
    w
    return<wrap {...prop}/>
  }
};

export default Auth;