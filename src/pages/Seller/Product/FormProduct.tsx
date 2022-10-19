import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VoucherConstant from '../../../constants/voucher';
import Button from '../../../components/Button/Button';
import ProductMainInfo from './FormItem/ProductMainInfo';
import ProductVariantInfo from './FormItem/ProductVariantInfo';
import ProductOtherInfo from './FormItem/ProductOtherInfo';

const FormProduct:FC<any> = ({
  title, formType,
}) => {
  const navigate = useNavigate();
  // const axiosPrivate = useAxiosPrivate();

  const [product, setProduct] = useState({
    name: '',
    is_bulk_enabled: false,
    min_quantity: 0,
    max_quantity: 0,
    video_url: '',
    is_hazardous: false,
    condition_status: '',
    length: '',
    width: '',
    height: '',
    weight: '',
    default_price: 0,
    default_stock: 0,
    product_photos: [],
  });

  const handleOnChange = (e: any) => {
    let isBool = false;
    if (e.target.name === 'is_hazardous') {
      isBool = true;
    }

    setProduct({
      ...product,
      [e.target.name]: isBool ? Boolean(e.target.value) : e.target.value,
    });
  };

  const handleUpdate = () => {
    console.log('ko');
  };

  const handleSubmit = () => {
    console.log('ko');
  };

  return (
    <div className="product-form__container">
      <h3 className="mb-4 mt-2">{title}</h3>
      <div className="product-form__content">
        <form onSubmit={(e) => e.preventDefault()}>
          <ProductMainInfo product={product} formType={formType} handleOnChange={handleOnChange} />
          <ProductVariantInfo
            product={product}
            formType={formType}
            handleOnChange={handleOnChange}
          />
          <ProductOtherInfo product={product} formType={formType} handleOnChange={handleOnChange} />
          <div className="d-flex flex-row-reverse gap-3">
            {formType === VoucherConstant.CREATE && <Button isSubmit buttonType="primary" handleClickedButton={handleSubmit} text="Simpan" />}
            {formType === VoucherConstant.UPDATE && <Button isSubmit buttonType="primary" handleClickedButton={handleUpdate} text="Simpan Perubahan" />}
            <Button buttonType="secondary alt" handleClickedButton={() => navigate('/seller/product/list')} text="Batal" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormProduct;
