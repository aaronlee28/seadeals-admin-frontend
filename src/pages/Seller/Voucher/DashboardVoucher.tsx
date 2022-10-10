import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import VoucherAPI from '../../../api/voucher';
import ListVoucher from './ListVoucher';
import Button from '../../../components/Button/Button';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Pagination from '../../../components/Pagination/Pagination';
import FilterVoucher from './FilterVoucher';

const DashboardVoucher:FC<any> = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const innerRef = useRef(null);

  const [vouchers, setVouchers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [status, setStatus] = useState('');

  const findVoucherByUserID = async () => {
    const filter = `page=${page}&status=${status}`;
    await VoucherAPI.FindVoucherByUserID(axiosPrivate, filter)
      .then((resp:any) => {
        const { data } = resp.data;
        setTotalPage(data.total_pages);
        setPage(data.page);
        setVouchers(data.vouchers);
      })
      .catch((err:any) => err);
  };

  useEffect(() => {
    findVoucherByUserID().then();
  }, [page, status]);

  return (
    <div className="voucher__container">
      <h3>Voucher Toko</h3>
      <div className="voucher__content my-3">Statistik</div>
      <div className="voucher__content">
        <div className="d-flex justify-content-between mb-4">
          <div className="d-flex flex-column text-start">
            <h5 className="m-0">Daftar Voucher</h5>
            <p className="m-0 p-0">Buat voucher untuk menarik pembeli</p>
          </div>
          <Button buttonType="secondary" text="Buat voucher" handleClickedButton={() => navigate('/seller/voucher/new')} />
        </div>
        <div>
          <FilterVoucher status={status} setStatus={setStatus} />
          <ListVoucher vouchers={vouchers} />
          <Pagination
            totalPage={totalPage}
            page={page}
            setPage={setPage}
            innerRef={innerRef}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardVoucher;