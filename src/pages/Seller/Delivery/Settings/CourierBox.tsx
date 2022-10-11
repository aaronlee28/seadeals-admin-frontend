import React, { FC } from 'react';
import Toggle from '../../../../components/Toggle/Toggle';

interface CourierBoxProps {
  courierName: string,
}

const CourierBox:FC<CourierBoxProps> = ({ courierName }) => (
  <div className="courier_box">
    <p>{courierName}</p>
    <div className="d-flex align-items-center">
      <Toggle id={`${courierName} asd`} />
    </div>
  </div>
);

export default CourierBox;
