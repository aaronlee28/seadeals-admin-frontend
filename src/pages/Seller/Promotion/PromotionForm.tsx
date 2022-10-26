import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './PromotionsDashboard.scss';
import toast from 'react-hot-toast';
import PromotionBasicInfo from './PromotionFormItem/PromotionBasicInfo';
import PromotionBonusInfo from './PromotionFormItem/PromotionBonusInfo';
import PromotionsAPI from '../../../api/promotions';
import Button from '../../../components/Button/Button';
import VoucherConstant from '../../../constants/voucher';

const PromotionForm:FC<any> = ({ title, formType }) => {
  const navigate = useNavigate();
  const [reqProducts, setReqProducts] = useState<any>([]);

  const [promotion, setPromotion] = useState({
    products: reqProducts,
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    quota: '',
    max_quota: '',
    amount_type: '',
    amount: '',
    banner_url: '',
  });

  const min = 0;
  const max = 100;

  const handleOnChange = (e: any) => {
    if (e.target.name === 'amount' && promotion.amount_type === VoucherConstant.PERCENTAGE) {
      const newValue = Math.max(min, Math.min(max, Number(e.target.value)));
      if (newValue === 0) {
        setPromotion({
          ...promotion,
          [e.target.name]: null,
        });
      }
      if (newValue > 0) {
        setPromotion({
          ...promotion,
          [e.target.name]: newValue,
        });
      }
      return;
    }
    setPromotion({
      ...promotion,
      [e.target.name]: e.target.value,
    });
  };

  // const handleUpdate = async () => {
  //   try {
  //     const response = await axiosPrivate.patch(
  //       `${PROMOTION_URL}/${voucherID}`,
  //       JSON.stringify({
  //         ...voucher,
  //         quota: Number(voucher.quota),
  //         amount: Number(voucher.amount),
  //         min_spending: Number(voucher.min_spending),
  //         start_date: `${voucher.start_date}+07:00`,
  //         end_date: `${voucher.end_date}+07:00`,
  //       }),
  //     );
  //     if (response.status === 200) {
  //       toast.success('Promosi berhasil diubah');
  //     }
  //     navigate('/seller/promotions/list');
  //   } catch (err:any) {
  //     toast.error(err.response?.data?.message);
  //   }
  // };

  const handleSubmit = async () => {
    console.log(JSON.stringify({
      products: reqProducts,
      name: promotion.name,
      description: promotion.description,
      start_date: `${promotion.start_date}+07:00`,
      end_date: `${promotion.end_date}+07:00`,
      quota: Number(promotion.quota),
      amount: Number(promotion.amount),
      amount_type: promotion.amount_type,
      max_quota: Number(promotion.max_quota),
      banner_url: promotion.banner_url,
    }));
    try {
      const response = await PromotionsAPI.AddPromotion(
        JSON.stringify({
          products: reqProducts,
          name: promotion.name,
          description: promotion.description,
          start_date: `${promotion.start_date}+07:00`,
          end_date: `${promotion.end_date}+07:00`,
          quota: Number(promotion.quota),
          amount: Number(promotion.amount),
          amount_type: promotion.amount_type,
          max_quota: Number(promotion.max_quota),
          banner_url: promotion.banner_url,
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
            promotion={promotion}
            formType={formType}
            handleOnChange={handleOnChange}
          />
          <PromotionBonusInfo
            promotion={promotion}
            setReqProducts={setReqProducts}
            formType={formType}
            handleOnChange={handleOnChange}
          />
          <div className="d-flex flex-row-reverse gap-3 mt-3">
            {formType === VoucherConstant.CREATE && <Button isSubmit buttonType="primary" handleClickedButton={handleSubmit} text="Simpan" />}
            {formType === VoucherConstant.UPDATE && <Button isSubmit buttonType="primary" handleClickedButton={handleSubmit} text="Simpan Perubahan" />}
            <Button buttonType="secondary alt" handleClickedButton={() => navigate('/seller/promotions/list')} text={formType === VoucherConstant.SHOW ? 'Kembali' : 'Batal'} />
          </div>
        </form>
      </div>
    </div>
  );
};
export default PromotionForm;
