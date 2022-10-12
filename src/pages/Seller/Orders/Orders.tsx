import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import OrdersNav from './OrdersNav';
import OrdersList from './OrdersList';
import './Orders.scss';
import LoadingPlain from '../../../components/Loading/LoadingPlain';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

const Orders = () => {
  const axiosPrivate = useAxiosPrivate();
  const [searchParam, setSearchParam] = useSearchParams();

  const [couriers, setCouriers] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [orders, setOrders] = useState([]);

  const [filter, setFilter] = useState(searchParam.get('type') || '');

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getSellerOrders = async () => {
      try {
        const couriersRes = await axiosPrivate.get('couriers', {
          signal: controller.signal,
        });
        // console.log(couriersRes.data);
        setCouriers(couriersRes.data.data);

        const response = await axiosPrivate.get(`sellers/orders?filter=${filter}`, {
          signal: controller.signal,
        });
        const { data } = response.data;
        if (isMounted) {
          setLoadingOrders(false);
          setOrders(data.orders);
        }
      } catch (err) {
        toast.error('gagal memuat daftar pesanan');
      }
    };
    getSellerOrders();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [filter]);

  const setParam = (status:string) => {
    setSearchParam({ type: status });
    setFilter(status);
  };

  return (
    <div className="py-4">
      <OrdersNav setParam={setParam} active={filter} />
      {loadingOrders
        ? <LoadingPlain height={64} />
        : <OrdersList orders={orders} couriers={couriers} />}
    </div>
  );
};

export default Orders;
