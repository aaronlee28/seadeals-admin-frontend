import React, { FC, useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

import './PromotionsDashboard.scss';
import toast from 'react-hot-toast';
import PromotionBasicInfo from './PromotionFormItem/PromotionBasicInfo';
import PromotionBonusInfo from './PromotionFormItem/PromotionBonusInfo';
import VoucherAPI from '../../../api/voucher';
import Button from '../../../components/Button/Button';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import VoucherConstant from '../../../constants/voucher';

const PROMOTION_URL = 'vouchers';

const PromotionForm:FC<any> = ({ title, formType }) => {
  const navigate = useNavigate();
  const { voucherID } = useParams();
  const [searchParams] = useSearchParams();
  const vID = searchParams.get('copy');
  const axiosPrivate = useAxiosPrivate();

  const [voucher, setVoucher] = useState({
    name: '',
    code: '',
    start_date: '',
    end_date: '',
    quota: '',
    amount_type: 'percentage',
    amount: '',
    min_spending: '',
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
    await VoucherAPI.FindVoucherByID(axiosPrivate, vID || voucherID)
      .then((resp:any) => {
        const { data } = resp.data;
        setVoucher({
          ...data,
          code: vID ? '' : data.code,
          start_date: data.start_date.replace('Z', ''),
          end_date: data.end_date.replace('Z', ''),
        });
      })
      .catch((err:any) => toast.error(err.response?.data?.message));
  };

  useEffect(() => {
    if (formType !== '' && (vID !== null || voucherID !== undefined)) {
      findVoucherByID().then();
    }
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await axiosPrivate.patch(
        `${PROMOTION_URL}/${voucherID}`,
        JSON.stringify({
          ...voucher,
          quota: Number(voucher.quota),
          amount: Number(voucher.amount),
          min_spending: Number(voucher.min_spending),
          start_date: `${voucher.start_date}+07:00`,
          end_date: `${voucher.end_date}+07:00`,
        }),
      );
      if (response.status === 200) {
        toast.success('Promosi berhasil diubah');
      }
      navigate('/seller/promotions/list');
    } catch (err:any) {
      toast.error(err.response?.data?.message);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosPrivate.post(
        PROMOTION_URL,
        JSON.stringify({
          ...voucher,
          quota: Number(voucher.quota),
          amount: Number(voucher.amount),
          min_spending: Number(voucher.min_spending),
          start_date: `${voucher.start_date}+07:00`,
          end_date: `${voucher.end_date}+07:00`,
        }),
      );
      if (response.status === 200) {
        toast.success('Promosi baru berhasil dibuat');
      }
      navigate('/seller/promotions/list');
    } catch (err:any) {
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <div className="promotions-dashboard_container">
      <h3 className="mb-4 mt-2">{title}</h3>
      <div className="promotion_content">
        <form onSubmit={(e) => e.preventDefault()}>
          <PromotionBasicInfo
            voucher={voucher}
            formType={formType}
            handleOnChange={handleOnChange}
          />
          <PromotionBonusInfo
            promotions={voucher}
            formType={formType}
            handleOnChange={handleOnChange}
          />
          <div className="d-flex flex-row-reverse gap-3 mt-3">
            {formType === VoucherConstant.CREATE && <Button isSubmit buttonType="primary" handleClickedButton={handleSubmit} text="Simpan" />}
            {formType === VoucherConstant.UPDATE && <Button isSubmit buttonType="primary" handleClickedButton={handleUpdate} text="Simpan Perubahan" />}
            <Button buttonType="secondary alt" handleClickedButton={() => navigate('/seller/promotions/list')} text={formType === VoucherConstant.SHOW ? 'Kembali' : 'Batal'} />
          </div>
        </form>
      </div>
    </div>
  );
};
export default PromotionForm;
