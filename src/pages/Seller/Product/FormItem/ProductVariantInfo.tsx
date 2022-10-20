import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import VoucherConstant from '../../../../constants/voucher';
import RadioBoolean from '../../../../components/RadioBoolean/RadioBoolean';
import Button from '../../../../components/Button/Button';
import { ReactComponent as IconClose } from '../../../../assets/svg/icon_close.svg';

interface DataVariant {
  variant1: string,
  variant2: string,
  price?: number,
  stock?: number,
  code?: string,
}

const ProductVariantInfo:FC<any> = ({
  product, formType, handleOnChange, setProduct,
}) => {
  const [showVariantTable, setShowVariantTable] = useState(false);
  const [dataVariants, setDataVariants] = useState<any>({});
  const [variant1, setVariant1] = useState<any>([]);
  const [variant2, setVariant2] = useState<any>([]);

  const inputVariant1Ref = useRef(null);
  const inputVariant2Ref = useRef(null);

  const rowVariant:FC<DataVariant> = (data) => (
    <tr>
      <td>{data.variant1}</td>
      {product.variant_2_name && <td>{data.variant2}</td>}
      <td><input value={data.price} /></td>
      <td><input value={data.stock} /></td>
      <td><input value={data.code} /></td>
    </tr>
  );

  const removeVariantByIdx = (index:number) => {
    setVariant1(variant1.filter((_:any, id:number) => id !== index));
  };

  const handleChangeByName = (name:string, value:any) => {
    setProduct({ ...product, [name]: value });
  };

  useEffect(() => {
    const tmp = dataVariants;
    variant1.forEach((item:any) => variant2.forEach((item2:any) => {
      tmp[item + item2] = tmp[item + item2]
        ? tmp[item + item2]
        : { variant1: item, variant2: item2 };
    }));
    setDataVariants(
      tmp,
    );
  }, [variant1, variant2]);

  console.log(dataVariants);
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
              <div className="col-9 variant__input-container">
                <div className="d-flex gap-3">
                  <input
                    ref={inputVariant1Ref}
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
                  <>
                    <Button
                      buttonType="primary alt"
                      handleClickedButton={() => { setVariant1([...variant1, '']); }}
                      text="Tambah varian 1"
                    />
                    {React.createElement(IconClose, { className: 'icon-remove', onClick: () => { setVariant1([]); handleChangeByName('variant_1_name', ''); } })}
                  </>
                  )}
                </div>
                <div className="row mt-3">
                  {variant1.map((item:any, index:number) => (
                    <div className="col-4">
                      <div className="d-flex">
                        <input
                          ref={inputVariant1Ref}
                          className="form__input p-2 my-1 rounded"
                          placeholder="Masukkan variasi"
                          type="text"
                          maxLength={20}
                          onChange={(e) => {
                            const variant1Tmp = [...variant1];
                            variant1Tmp[index] = e.target.value;
                            setVariant1(variant1Tmp);
                          }}
                          value={item}
                          readOnly={formType === VoucherConstant.SHOW}
                          disabled={formType === VoucherConstant.SHOW}
                        />
                        {React.createElement(IconClose, { className: 'icon-remove small', onClick: () => removeVariantByIdx(index) })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {product.variant_1_name !== '' && (
            <div className="row my-3">
              <label className="col-3 text-end align-self-center">Variasi 2</label>
              <div className="col-9 variant__input-container">
                <div className="d-flex gap-3">
                  <input
                    ref={inputVariant2Ref}
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
                    <>
                      <Button
                        buttonType="primary alt"
                        handleClickedButton={() => { setVariant2([...variant2, '']); }}
                        text="Tambah varian 2"
                      />
                      {React.createElement(IconClose, { className: 'icon-remove', onClick: () => { setVariant2([]); handleChangeByName('variant_2_name', ''); } })}
                    </>
                  )}
                </div>
                <div className="row mt-3">
                  {variant2.map((item:any, index:number) => (
                    <div className="col-4">
                      <div className="d-flex">
                        <input
                          ref={inputVariant2Ref}
                          className="form__input p-2 my-1 rounded"
                          placeholder="Masukkan variasi"
                          type="text"
                          maxLength={20}
                          onChange={(e) => {
                            const variant2Tmp = [...variant2];
                            variant2Tmp[index] = e.target.value;
                            setVariant2(variant2Tmp);
                          }}
                          value={item}
                          readOnly={formType === VoucherConstant.SHOW}
                          disabled={formType === VoucherConstant.SHOW}
                        />
                        {React.createElement(IconClose, { className: 'icon-remove small', onClick: () => removeVariantByIdx(index) })}
                      </div>
                    </div>
                  ))}
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
                      {product.variant_2_name && <th className="text-start">{product.variant_2_name || 'Variasi 2'}</th>}
                      <th className="text-start">Harga</th>
                      <th className="text-start">Stok</th>
                      <th className="text-start">Kode Variasi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(dataVariants).map((item:any) => rowVariant(item))}
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
