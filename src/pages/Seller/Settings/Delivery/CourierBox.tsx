import React, { FC } from 'react';
import Toggle from '../../../../components/Toggle/Toggle';

interface CourierBoxProps {
  courier: any,
  handleChange: (e:any)=>void
}

const CourierBox:FC<CourierBoxProps> = ({ courier, handleChange }) => (
  <div className="courier_box">
    <p>{courier.name}</p>
    <div className="d-flex align-items-center">
      <Toggle id={courier.id} inputID={`${courier.name}`} isChecked={courier.used || false} handleChange={handleChange} />
    </div>
  </div>
);
export default CourierBox;
