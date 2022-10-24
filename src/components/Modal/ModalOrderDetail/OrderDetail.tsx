import React, { FC } from 'react';
import OrderDetailItemList from './OrderDetailItemList';
import OrderDetailSummary from './OrderDetailSummary';
import Button from '../../Button/Button';

interface OrderDetailProps {
  order:any,
  toggleDelivery: ()=>void
}

const OrderDetail:FC<OrderDetailProps> = ({ order, toggleDelivery }) => (
  <>
    <div className="mb-3">
      <h4 className="fw-bold mb-0">Rincian Pesanan</h4>
      <small className="pe-5 text-secondary">{`No. Pesanan: ${order?.id}`}</small>
    </div>
    <div className="row">
      <div className="col-7">
        <OrderDetailItemList orderItems={order?.order_items || []} />
      </div>
      <div className="col-5 border-start ps-4">
        <OrderDetailSummary order={order} />
        <Button
          buttonType="secondary"
          handleClickedButton={() => toggleDelivery()}
          text="Lihat Pengiriman"
        />
      </div>
    </div>
  </>
);

export default OrderDetail;
