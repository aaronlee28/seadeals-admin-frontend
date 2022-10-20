import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import VoucherConstant from '../../../constants/voucher';
import Button from '../../../components/Button/Button';
import ProductMainInfo from './FormItem/ProductMainInfo';
import ProductVariantInfo from './FormItem/ProductVariantInfo';
import ProductOtherInfo from './FormItem/ProductOtherInfo';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

const CREATE_PRODUCT_URL = 'sellers/create-product';

const FormProduct:FC<any> = ({
  title, formType,
}) => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    category_id: 0,
    is_bulk_enabled: false,
    min_quantity: '',
    max_quantity: '',
    video_url: '',
    is_hazardous: false,
    condition_status: '',
    length: '',
    width: '',
    height: '',
    weight: '',
    default_price: '',
    default_stock: '',
    variant_1_name: '',
    variant_2_name: '',
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

  const setCategoryID = (categoryID:any) => {
    setProduct({
      ...product,
      category_id: categoryID,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosPrivate.post(
        CREATE_PRODUCT_URL,
        JSON.stringify({
          name: product.name,
          category_id: product.category_id,
          is_bulk_enabled: false,
          min_quantity: Number(product.min_quantity),
          max_quantity: Number(product.max_quantity),
          variant_1_name: product.variant_1_name,
          variant_2_name: product.variant_2_name,
          default_price: product.default_price || 99,
          default_stock: product.default_stock || 1,
          product_detail_req: {
            description: product.description,
            video_url: product.video_url,
            is_hazardous: product.is_hazardous,
            condition_status: product.condition_status,
            weight: Number(product.weight),
            length: Number(product.length),
            width: Number(product.width),
            height: Number(product.height),
          },
        }),
      );
      if (response.status === 200) {
        toast.success('produk baru berhasil dibuat');
      }
      navigate('/seller/product/list');
    } catch (err:any) {
      toast.error(err.response?.data?.message);
    }
  };

  const handleUpdate = () => {
    console.log('ko');
  };

  return (
    <div className="product-form__container">
      <h3 className="mb-4 mt-2">{title}</h3>
      <div className="product-form__content">
        <form onSubmit={(e) => e.preventDefault()}>
          <ProductMainInfo
            product={product}
            formType={formType}
            handleOnChange={handleOnChange}
            setCategoryID={setCategoryID}
          />
          <ProductVariantInfo
            product={product}
            formType={formType}
            handleOnChange={handleOnChange}
            setProduct={setProduct}
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
