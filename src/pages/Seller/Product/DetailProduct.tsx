import React, { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import ProductAPI from '../../../api/product';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Button from '../../../components/Button/Button';

const DetailProduct:FC<any> = () => {
  const navigate = useNavigate();
  const { productID } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [product, setProduct] = useState({});

  const findProductByID = async () => {
    await ProductAPI.FindProductByID(axiosPrivate, productID)
      .then((resp:any) => {
        const { data } = resp.data;
        setProduct(data);
      })
      .catch((err:any) => toast.error(err.response?.data?.message));
  };

  useEffect(() => {
    findProductByID().then();
  }, []);

  console.log(product);
  return (
    <div className="product-form__container">
      <h3 className="mb-4 mt-2">Detail Produk</h3>
      <div className="product-form__content">
        <div className="d-flex flex-row-reverse gap-3">
          <Button buttonType="secondary alt" handleClickedButton={() => navigate('/seller/product/list')} text="Kembali" />
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
