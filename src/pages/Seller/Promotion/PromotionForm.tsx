import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Promotions.scss';
import toast from 'react-hot-toast';
import PromotionBasicInfo from './PromotionFormItem/PromotionBasicInfo';
import PromotionBonusInfo from './PromotionFormItem/PromotionBonusInfo';
import PromotionsAPI from '../../../api/promotions';
import Button from '../../../components/Button/Button';
import VoucherConstant from '../../../constants/voucher';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

const PromotionForm:FC<any> = ({ title, formType }) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [promotion, setPromotion] = useState({
    product_id: '',
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    quota: '',
    max_quota: '',
    amount_type: '',
    amount: '',
    banner_url: 'dawdaw.png',
  });

  const [promotions, setPromotions] = useState<any>([]);

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
        return;
      }
      if (newValue > 0) {
        setPromotion({
          ...promotion,
          [e.target.name]: newValue,
        });
        return;
      }
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
    try {
      const reqBody:any = [];
      promotions.forEach((promo:any) => {
        reqBody.push({
          product_id: promo.product_id,
          name: promotion.name,
          description: promotion.description,
          start_date: `${promotion.start_date}Z`,
          end_date: `${promotion.end_date}Z`,
          quota: Number(promo.quota),
          amount: Number(promo.amount),
          amount_type: promo.amount_type,
          max_order: Number(promo.max_quota),
          banner_url: promo.banner_url,
        });
      });
      const response = await PromotionsAPI.AddPromotion(
        axiosPrivate,
        { create_promotion: reqBody },
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
            setPromotion={setPromotion}
            formType={formType}
            handleOnChange={handleOnChange}
          />
          {
              (promotion.start_date !== '' && promotion.end_date !== '') && (
              <>
                <PromotionBonusInfo
                  promotion={promotion}
                  setPromotions={setPromotions}
                  formType={formType}
                  handleOnChange={handleOnChange}
                />
                <div className="d-flex flex-row-reverse gap-3 mt-3">
                  {formType === VoucherConstant.CREATE && <Button isSubmit buttonType="primary" handleClickedButton={handleSubmit} text="Simpan" />}
                  {formType === VoucherConstant.UPDATE && <Button isSubmit buttonType="primary" handleClickedButton={handleSubmit} text="Simpan Perubahan" />}
                  <Button buttonType="secondary alt" handleClickedButton={() => navigate('/seller/promotions/list')} text={formType === VoucherConstant.SHOW ? 'Kembali' : 'Batal'} />
                </div>
              </>
              )
          }
        </form>
      </div>
    </div>
  );
};
export default PromotionForm;
