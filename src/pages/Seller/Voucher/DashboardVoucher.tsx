import React, { FC, useEffect, useState } from 'react';
import VoucherAPI from '../../../api/voucher';
import ListVoucher from './ListVoucher';

const DashboardVoucher:FC<any> = () => {
  const [vouchers, setVouchers] = useState([]);
  const [pagination, setPagination] = useState({});

  const findVoucherByUserID = async () => {
    await VoucherAPI.FindVoucherByUserID()
      .then((resp) => {
        const { data } = resp.data;
        setPagination({
          limit: data.limit,
          page: data.page,
          totalPages: data.total_pages,
          totalVouchers: data.total_vouchers,
        });
        setVouchers(data.vouchers);
      })
      .catch((err) => err);
  };

  useEffect(() => {
    findVoucherByUserID().then();
  }, []);

  console.log(pagination);
  return (
    <div className="container">
      <h4>Voucher Toko</h4>
      <div className="bg-dark p-2">Statistik</div>
      <ListVoucher vouchers={vouchers} />
    </div>
  );
};

export default DashboardVoucher;
