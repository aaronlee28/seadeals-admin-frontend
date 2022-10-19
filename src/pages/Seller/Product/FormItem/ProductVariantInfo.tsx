import React, { FC, useEffect, useState } from 'react';
import VoucherConstant from '../../../../constants/voucher';
import RadioBoolean from '../../../../components/RadioBoolean/RadioBoolean';
import Button from '../../../../components/Button/Button';

interface DataVariant {
  variant_1_value?: string,
  variant_2_value?: string,
  price?: number,
  stock?: number,
  code?: string,
}

const ProductVariantInfo:FC<any> = ({ product, formType, handleOnChange }) => {
  const [showVariantTable, setShowVariantTable] = useState(false);
  const [var1Length, setVar1Length] = useState(1);
  const [var2Length, setVar2Length] = useState(1);
  const [dataVariants, setDataVariants] = useState<DataVariant[]>([]);

  const rowVariant:FC<DataVariant> = (data) => (
    <tr>
      <td><input value={data.variant_1_value} /></td>
      <td><input value={data.variant_2_value} /></td>
      <td><input value={data.price} /></td>
      <td><input value={data.stock} /></td>
      <td><input value={data.code} /></td>
      <td>X</td>
    </tr>
  );
  console.log(setDataVariants);

  useEffect(() => {
    setDataVariants([...dataVariants]);
  }, []);

  return (
    <div className="my-4">
      <h5 className="text-start"><b>Informasi Penjualan</b></h5>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center">Batas Pembelian</label>
        <div className="col-9 p-0">
          <div className="d-flex flex-row gap-3 align-items-center p-0">
            <div className="p-0 m-0">
              <div className="input-group suffix small p-0">
                <input
                  name="min_quantity"
                  className="form__input p-2"
                  placeholder="Masukkan angka"
                  type="number"
                  onChange={handleOnChange}
                  required
                  value={product.min_quantity}
                  min={1}
                  max={10000}
                  readOnly={formType === VoucherConstant.SHOW}
                  disabled={formType === VoucherConstant.SHOW}
                />
                <span className="input-group-addon">pcs</span>
              </div>
              <p className="input__caption">Minimal pembelian</p>
            </div>
            <span className="text-start text-secondary-blue">-</span>
            <div>
              <div className="input-group suffix small p-0">
                <input
                  name="max_quantity"
                  className="form__input p-2"
                  placeholder="Masukkan angka"
                  type="number"
                  onChange={handleOnChange}
                  required
                  value={product.max_quantity}
                  min={1}
                  max={10000}
                  readOnly={formType === VoucherConstant.SHOW}
                  disabled={formType === VoucherConstant.SHOW}
                />
                <span className="input-group-addon">pcs</span>
              </div>
              <p className="input__caption">Maksimal pembelian</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center" htmlFor="name">Tambah Produk Varian</label>
        <div className="col-9 p-0">
          <RadioBoolean name="enable_variant" data={showVariantTable} handleOnChange={() => setShowVariantTable(!showVariantTable)} formType={formType} />
        </div>
      </div>
      {!showVariantTable
        ? (
          <>
            <div className="row my-3">
              <label className="col-3 text-end align-self-center" htmlFor="default_price">Harga Produk</label>
              <div className="col-9 p-0">
                <div className="row">
                  <div className="input-group prefix">
                    <span className="input-group-addon">Rp</span>
                    <input
                      name="default_price"
                      className="form__input"
                      placeholder="Masukkan angka"
                      type="number"
                      onChange={handleOnChange}
                      required
                      value={product.default_price}
                      readOnly={formType === VoucherConstant.SHOW}
                      disabled={formType === VoucherConstant.SHOW}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row my-3">
              <label className="col-3 text-end align-self-center" htmlFor="default_stock">Stok Produk</label>
              <div className="col-9 p-0">
                <div className="row">
                  <div className="input-group suffix">
                    <input
                      name="default_stock"
                      className="form__input"
                      placeholder="Masukkan angka"
                      type="number"
                      onChange={handleOnChange}
                      required
                      value={product.default_stock}
                      readOnly={formType === VoucherConstant.SHOW}
                      disabled={formType === VoucherConstant.SHOW}
                    />
                    <span className="input-group-addon">Pcs</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
        : (
          <>
            <div className="row my-3">
              <label className="col-3 text-end align-self-center">Variasi 1</label>
              <div className="col-9 p-0">
                <div className="d-flex gap-3">
                  <input
                    name="variant_1_name"
                    className="form__input p-2 rounded"
                    placeholder="Masukkan nama variasi"
                    type="text"
                    onChange={handleOnChange}
                    value={product.variant_1_name}
                    readOnly={formType === VoucherConstant.SHOW}
                    disabled={formType === VoucherConstant.SHOW}
                  />
                  {product.variant_1_name !== '' && (
                  <Button
                    buttonType="primary alt"
                    handleClickedButton={() => setVar1Length(var1Length + 1)}
                    text="Tambah varian 1"
                  />
                  )}
                </div>
              </div>
            </div>
            {product.variant_1_name !== '' && (
            <div className="row my-3">
              <label className="col-3 text-end align-self-center">Variasi 2</label>
              <div className="col-9 p-0">
                <div className="d-flex gap-3">
                  <input
                    name="variant_2_name"
                    className="form__input p-2 rounded"
                    placeholder="Masukkan nama variasi"
                    type="text"
                    onChange={handleOnChange}
                    value={product.variant_2_name}
                    readOnly={formType === VoucherConstant.SHOW}
                    disabled={formType === VoucherConstant.SHOW}
                  />
                  {product.variant_2_name !== '' && (
                  <Button
                    buttonType="primary alt"
                    handleClickedButton={() => setVar2Length(var2Length + 1)}
                    text="Tambah varian 2"
                  />
                  )}
                </div>
              </div>
            </div>
            )}
            <div className="row my-3">
              <label className="col-3 text-end align-self-center">Daftar Variasi</label>
              <div className="col-9 p-0 table-responsive">
                <table className="table border table-hover">
                  <thead>
                    <tr className="table-secondary">
                      <th className="text-start">{product.variant_1_name || 'Variasi'}</th>
                      <th className="text-start">{product.variant_2_name || 'Variasi 2'}</th>
                      <th className="text-start">Harga</th>
                      <th className="text-start">Stok</th>
                      <th className="text-start">Kode Variasi</th>
                      <th className="text-start">Hapus</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataVariants.map((item:any) => rowVariant(item))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
    </div>
  );
};

export default ProductVariantInfo;
