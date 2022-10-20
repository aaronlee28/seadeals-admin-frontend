import React, { FC, useEffect } from 'react';
import Formatter from '../../../utils/formatter';

interface ProductProps {
  product: any
}

const OrderItemProduct:FC<ProductProps> = ({ product }) => {
  useEffect(() => {
    console.log(product);
  }, []);
  const {
    product_variant_detail: productVariant,
    quantity,
    subtotal,
  } = product;
  const productDetail = productVariant?.product;

  return (
    <>
      <div className="col-8 d-flex justify-content-between mb-2">
        <div className="d-flex gap-4">
          <div className="order_item_image">
            <img src="https://loremflickr.com/56/56" alt="produk name" />
          </div>
          <small className="fw-bold">{productDetail?.name}</small>
        </div>
        <p>{`x${quantity}`}</p>
      </div>
      <div className="col-4">
        <p>{Formatter.DisplayPrice(subtotal)}</p>
      </div>
    </>
  );
};

export default OrderItemProduct;
