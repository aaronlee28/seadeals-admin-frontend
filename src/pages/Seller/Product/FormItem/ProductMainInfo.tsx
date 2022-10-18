import React, { FC, useState } from 'react';
import VoucherConstant from '../../../../constants/voucher';
import Modal from '../../../../components/Modal/Modal';
import CategoryInput from './CategoryInput';

const ProductMainInfo:FC<any> = ({ product, formType, handleOnChange }) => {
  const [category, setCategory] = useState({
    name: '',
  });
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  return (
    <div className="my-4">
      {
        showCategoryModal
          && (
          <Modal modalType="" cancel={() => setShowCategoryModal(false)}>
            <CategoryInput
              setCatData={setCategory}
              handleClose={() => setShowCategoryModal(false)}
            />
          </Modal>
          )
      }
      <h5 className="text-start"><b>Informasi Dasar</b></h5>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center" htmlFor="name">Nama Produk</label>
        <input
          name="name"
          className="col-9 border rounded p-2"
          maxLength={100}
          placeholder="Masukkan nama produk"
          type="text"
          required
          value={product.name}
          readOnly={formType === VoucherConstant.SHOW}
          disabled={formType === VoucherConstant.SHOW}
          onChange={handleOnChange}
        />
      </div>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center">Kategori</label>
        <div className="col-9 product-form__category" role="presentation" onClick={() => setShowCategoryModal(true)}>
          <span>{category.name || 'Pilih kategori'}</span>
        </div>
      </div>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center" htmlFor="description">Deskripsi</label>
        <textarea
          name="description"
          className="col-9 border rounded p-2"
          maxLength={2000}
          placeholder="Masukkan deskripsi produk"
          required
          value={product.description}
          readOnly={formType === VoucherConstant.SHOW}
          disabled={formType === VoucherConstant.SHOW}
          onChange={handleOnChange}
        />
      </div>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center" htmlFor="photo">Foto Produk</label>
        <input
          name="image"
          className="col-9 border rounded p-2"
          type="file"
          required
          value={product.product_photos[0]}
          readOnly={formType === VoucherConstant.SHOW}
          disabled={formType === VoucherConstant.SHOW}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};

export default ProductMainInfo;
