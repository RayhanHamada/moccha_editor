import React from 'react';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';

const style = css`
  display: block;
  margin: 0 auto;
  /* border-color: #454545; */
`;

const Spinner = () => {
  return (
    <div className="spinner-wrapper">
      <ClipLoader css={style} size={35} loading={true} color={'#454545'} />
    </div>
  );
};

export default Spinner;
