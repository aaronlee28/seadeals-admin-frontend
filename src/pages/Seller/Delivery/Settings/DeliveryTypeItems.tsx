import React from 'react';
import CourierBox from './CourierBox';

const DeliveryTypeItems = () => (
  <div className="delivery_type_couriers mb-4">
    <CourierBox courierName="JNE" />
    <CourierBox courierName="TIKI" />
    <CourierBox courierName="POS" />
  </div>
);

export default DeliveryTypeItems;
