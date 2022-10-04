import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../../../api/axios';

import './Voucher.scss';
import VoucherBasicInfo from './FormItem/VoucherBasicInfo';
import VoucherBonusInfo from './FormItem/VoucherBonusInfo';

const VOUCHERS_URL = 'vouchers';

const FormVoucher = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [voucher, setVoucher] = useState({
    name: '',
    code: '',
    start_date: '',
    end_date: '',
    quota: 1,
    amount_type: 'percentage',
    amount: 1,
    min_spending: 0,
  });

  const handleOnChange = (e: any) => {
    if (e.target.name === 'code') {
      e.target.value = e.target.value.toUpperCase();
    }

    setVoucher({
      ...voucher,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axiosPrivate.post(
        VOUCHERS_URL,
        JSON.stringify({
          ...voucher,
          quota: Number(voucher.quota),
          amount: Number(voucher.amount),
          min_spending: Number(voucher.min_spending),
          start_date: `${voucher.start_date}Z`,
          end_date: `${voucher.end_date}Z`,
        }),
      );
      console.log(response);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form__container">
      <h3>Buat voucher toko</h3>
      <div className="form__content">
        <form onSubmit={handleSubmit}>
          <VoucherBasicInfo voucher={voucher} handleOnChange={handleOnChange} />
          <VoucherBonusInfo voucher={voucher} handleOnChange={handleOnChange} />
          <div className="d-flex flex-row-reverse">
            <button className="me-0 btn-primary" type="button">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default FormVoucher;
