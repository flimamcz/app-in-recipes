import React from 'react';
import ReactLoading from 'react-loading';

function Loading() {
  return (
    <div className=" d-flex justify-content-center align-items-center min-vh-100 bg">
      <ReactLoading type="spin" color="#41197F" />
    </div>
  );
}

export default Loading;
