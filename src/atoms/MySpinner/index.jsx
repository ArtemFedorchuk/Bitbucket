import React from 'react';
import { Spinner } from 'reactstrap';

const MySpinner = ({color}) => {
  return (
      <Spinner type="grow" color={color ? color : "info"} />
  );
};

export default MySpinner;
