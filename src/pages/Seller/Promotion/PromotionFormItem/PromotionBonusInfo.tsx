import React, { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import VoucherConstant from '../../../../constants/voucher';
import '../PromotionsDashboard.scss';
import Button from '../../../../components/Button/Button';
import Modal from '../../../../components/Modal/Modal';
import ProductListInfo from './ProductListInfo';
import { axiosPrivate } from '../../../../api/axios';
import ProductAPI from '../../../../api/product';

const PromotionBonusInfo:FC<any> = ({ promotions, formType, handleOnChange }) => {
  const [show, setShow] = useState<any>(false);

  const [products, setProducts] = useState<any>([]);
  const [deletedID, setDeletedID] = useState(undefined);

  const findProducts = async () => {
    await ProductAPI.FindProductBySellerID(axiosPrivate, null)
      .then((resp:any) => {
        const { data } = resp.data;
        setProducts(data.products);
      })
      .catch((err:any) => toast.error(err.response?.data?.message));
  };

  useEffect(() => {
    findProducts();
  }, [deletedID]);

  return (
    <div className="my-4">
      <h5 className="text-start"><b>Pengaturan Bonus</b></h5>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center" htmlFor="amount_type">Tipe promosi</label>
        <div className="col-9">
          <div className="d-flex gap-3">
            <div>
              <input
                type="radio"
                id="percentage"
                name="amount_type"
                onChange={handleOnChange}
                value="percentage"
                readOnly={formType === VoucherConstant.SHOW}
                disabled={formType === VoucherConstant.SHOW}
                checked={promotions.amount_type === VoucherConstant.PERCENTAGE}
              />
              <label htmlFor="percentage" className="mx-1">Persentase</label>
              <br />
            </div>
            <div>
              <input
                type="radio"
                id="nominal"
                name="amount_type"
                onChange={handleOnChange}
                value="nominal"
                readOnly={formType === VoucherConstant.SHOW}
                disabled={formType === VoucherConstant.SHOW}
                checked={promotions.amount_type === VoucherConstant.NOMINAL}
              />
              <label htmlFor="nominal" className="mx-1">Nominal</label>
              <br />
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center" htmlFor="amount">Promosi</label>
        <div className="col-9">
          <div className="row">
            {
                          promotions.amount_type === VoucherConstant.NOMINAL
                          && (
                          <div className="input-group prefix p-0">
                            <span className="input-group-addon">Rp</span>
                            <input
                              name="amount"
                              className="form__input"
                              placeholder="Masukkan angka"
                              type="number"
                              onChange={handleOnChange}
                              required
                              value={promotions.amount}
                              readOnly={formType === VoucherConstant.SHOW}
                              disabled={formType === VoucherConstant.SHOW}
                            />
                          </div>
                          )
                      }
            {
                          promotions.amount_type === VoucherConstant.PERCENTAGE
                          && (
                          <div className="input-group suffix p-0">
                            <input
                              name="amount"
                              max={100}
                              className="form__input"
                              placeholder="Masukkan angka"
                              type="number"
                              onChange={handleOnChange}
                              required
                              value={promotions.amount}
                              readOnly={formType === VoucherConstant.SHOW}
                              disabled={formType === VoucherConstant.SHOW}
                            />
                            <span className="input-group-addon">% (Persen)</span>
                          </div>
                          )
                      }
          </div>
        </div>
      </div>
      <h5 className="text-start"><b>Pengaturan Bawaan / Global</b></h5>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center" htmlFor="quota">Kuota promosi</label>
        <input
          name="quota"
          className="col-9 border rounded p-2"
          type="number"
          placeholder="Masukkan angka"
          required
          value={promotions.quota}
          readOnly={formType === VoucherConstant.SHOW}
          disabled={formType === VoucherConstant.SHOW}
          onChange={handleOnChange}
        />
      </div>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center" htmlFor="min_spending">Kuantitas maksimal</label>
        <div className="col-9">
          <div className="row">
            <div className="input-group prefix p-0">
              <input
                name="min_spending"
                className="form__input"
                placeholder="Masukkan angka"
                type="number"
                required
                value={promotions.min_spending}
                readOnly={formType === VoucherConstant.SHOW}
                disabled={formType === VoucherConstant.SHOW}
                onChange={handleOnChange}
              />
            </div>
          </div>
        </div>
        <div className="row my-3">
          <label className="col-3 text-end align-self-center" htmlFor="promodi-per-produk">Ubah semua</label>
          <div className="col-9">
            <Button buttonType="secondary" text="Ganti" handleClickedButton={() => setShow(true)} />
          </div>
        </div>
      </div>
      <h5 className="text-start"><b>Pengaturan Produk</b></h5>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center" htmlFor="promodi-per-produk">Produk</label>
        <div className="col-9">
          <Button buttonType="secondary alt" text="Tambah" handleClickedButton={() => setShow(true)} />
          {
                show && (
                <Modal modalType="" cancel={() => setShow(false)}>
                  <div className="d-flex py-5 justify-content-center">
                    <div className="row px-5">
                      <h5 className="text-start mb-4"><b>Tambah promosi per produk</b></h5>
                      <div className="row mt-2 mb-5">
                        <label className="col-3 text-end align-self-center" htmlFor="product">Pilih produk</label>
                        <div className="col-9 p-0">
                          <select className="form-select my-auto">
                            {
                                  products.map(
                                    (
                                      product:any,
                                    ) => (
                                      <option key={product.id}>
                                        {product.name}
                                      </option>
                                    ),
                                  )
                            }
                          </select>
                        </div>
                      </div>
                      <div className="d-inline-flex justify-content-end gap-3">
                        <Button buttonType="secondary alt" text="Tutup" handleClickedButton={() => setShow(false)} />
                        <Button buttonType="primary" text="Tambah" handleClickedButton={() => setShow(false)} />
                      </div>
                    </div>
                  </div>
                </Modal>
                )
            }
        </div>
      </div>
      <ProductListInfo
        products={products}
        setDeletedID={setDeletedID}
        discount={promotions.amount}
        promotionType={promotions.amount_type}
      />
    </div>
  );
};

export default PromotionBonusInfo;
