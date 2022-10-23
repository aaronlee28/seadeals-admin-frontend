import React, { FC } from 'react';
import Modal from '../Modal';
import OrderDetailItemList from './OrderDetailItemList';
import OrderDetailSummary from './OrderDetailSummary';
import Button from '../../Button/Button';

interface ModalOrderDetailProps {
  setShow: (isShow:boolean)=>void,
  order: any,
}

const ModalOrderDetail:FC<ModalOrderDetailProps> = ({ setShow, order }) => {
  const waitingForSeller = order.delivery.status === 'waiting for seller';
  console.log(order.delivery);
  const children = () => (
    <div className="p-5 pe-3 w-100 text-start">
      <div className="row">
        <div className="col-7">
          <OrderDetailItemList orderItems={order?.order_items || []} />
        </div>
        <div className="col-5 border-start ps-4">
          <OrderDetailSummary order={order} />
          {waitingForSeller
              && (
              <Button
                buttonType="secondary"
                handleClickedButton={() => {}}
                text="Buat Pengiriman"
              />
              )}
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      modalType="order_detail"
      cancel={() => setShow(false)}
    >
      {children()}
    </Modal>
  );
};

export default ModalOrderDetail;
