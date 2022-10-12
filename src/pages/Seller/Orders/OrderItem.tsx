import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import OrderItemProduct from './OrderItemProduct';
import Formatter from '../../../utils/formatter';

interface OrderItemProps {
  order: any,
  couriers: any[],
}

const OrderItem:FC<OrderItemProps> = ({ order, couriers }) => (
  <div className="container text-start mb-3">
    <div className="rounded-top border border-bottom-0 p-2 px-4 bg-light d-flex justify-content-between">
      <small>{order.user_id}</small>
      <small>{`No.Pesanan ${order.id}`}</small>
    </div>
    <div className="rounded-bottom border p-4 pb-2">
      <div className="row mb-2">
        <div className="col-6 row">
          {order.order_items.map((orderItem:any) => (
            <OrderItemProduct
              key={orderItem.id}
              product={orderItem}
            />
          ))}
        </div>
        <div className="col-2 fw-bold">
          <p>{order.status}</p>
        </div>
        <div className="col-2">
          <p>
            {order?.delivery
                  && couriers.find((cour) => cour.id === order.delivery.courier_id).name}
          </p>
        </div>
        <div className="col-2">
          <Link to={`seller/order/${order.id}`}>
            <p>Lihat Detail</p>
          </Link>
        </div>
        <div className="col-6 row pt-2">
          <div className="col-8" />
          <div className="col-4">
            <p>Total:</p>
            <p className="fw-bold">{Formatter.DisplayPrice(order.total)}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default OrderItem;
