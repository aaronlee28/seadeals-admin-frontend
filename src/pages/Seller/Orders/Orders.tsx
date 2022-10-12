import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import OrdersNav from './OrdersNav';
import OrdersList from './OrdersList';
import './Orders.scss';
import LoadingPlain from '../../../components/Loading/LoadingPlain';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Pagination from '../../../components/Pagination/Pagination';

const Orders = () => {
  const axiosPrivate = useAxiosPrivate();
  const [searchParam, setSearchParam] = useSearchParams();

  const [couriers, setCouriers] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [orders, setOrders] = useState([]);

  const [filter, setFilter] = useState(searchParam.get('type') || '');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getSellerOrders = async () => {
      try {
        setLoadingOrders(true);
        const couriersRes = await axiosPrivate.get('couriers', {
          signal: controller.signal,
        });
        setCouriers(couriersRes.data.data);

        const response = await axiosPrivate.get(`sellers/orders?filter=${filter}&page=${page}`, {
          signal: controller.signal,
        });
        const { data } = response.data;
        if (isMounted) {
          setLoadingOrders(false);
          setOrders(data.orders);
          setTotalPage(data.total_page);
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
  }, [filter, page]);

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
      <Pagination
        page={!page ? 1 : page}
        totalPage={totalPage}
        setPage={setPage}
        innerRef={{}}
      />
    </div>
  );
};

export default Orders;
