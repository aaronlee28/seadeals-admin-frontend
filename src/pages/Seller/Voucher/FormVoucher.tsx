import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { axiosPrivate } from '../../../api/axios';

import './Voucher.scss';
import VoucherBasicInfo from './FormItem/VoucherBasicInfo';
import VoucherBonusInfo from './FormItem/VoucherBonusInfo';
import Button from '../../../components/Button/Button';

const VOUCHERS_URL = 'vouchers';

const FormVoucher:FC<any> = ({ formType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const { voucherID } = useParams();

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

  const findVoucherByID = async () => {
    await VoucherAPI.FindVoucherByID(voucherID)
      .then((resp:any) => {
        setVoucher(resp.data.data);
      })
      .catch((err:any) => err);
  };

  useEffect(() => {
    if (formType !== 'create') {
      findVoucherByID().then();
    }
  }, [formType]);

  const handleSubmit = async () => {
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
    <div className="voucher__container">
      <h3>Buat voucher toko</h3>
      <div className="voucher__content">
        <form onSubmit={handleSubmit}>
          <VoucherBasicInfo voucher={voucher} formType={formType} handleOnChange={handleOnChange} />
          <VoucherBonusInfo voucher={voucher} formType={formType} handleOnChange={handleOnChange} />
          <div className="d-flex flex-row-reverse gap-3">
            {formType === 'create' && <Button buttonType="primary" handleClickedButton={handleSubmit} text="Simpan" />}
            <Button buttonType="secondary alt" handleClickedButton={() => navigate(from, { replace: true })} text="Kembali" />
          </div>
        </form>
      </div>
    </div>
  );
};
export default FormVoucher;
