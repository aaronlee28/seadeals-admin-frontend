import React, { FC } from 'react';
import OrdersListHeader from './OrdersListHeader';
import OrderItem from './OrderItem';

interface OrderListProps {
  orders: any[],
  couriers: any[]
}

const OrdersList:FC<OrderListProps> = ({ orders, couriers }) => (
  <div className="container bg-white text-start border-bottom pb-4">
    <OrdersListHeader />
    {
      orders.length > 0
        ? orders.map((order) => <OrderItem key={order.id} order={order} couriers={couriers} />)
        : <div className="text-center text-secondary"><p>Belum ada pesanan!</p></div>
  }
  </div>
);

export default OrdersList;
