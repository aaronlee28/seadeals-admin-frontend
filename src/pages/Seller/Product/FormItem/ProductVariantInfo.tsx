import React, {
  FC, useRef, useState,
} from 'react';
import VoucherConstant from '../../../../constants/voucher';
import RadioBoolean from '../../../../components/RadioBoolean/RadioBoolean';
import Button from '../../../../components/Button/Button';
import { ReactComponent as IconClose } from '../../../../assets/svg/icon_close.svg';

const ProductVariantInfo:FC<any> = ({
  product, formType, handleOnChange, setProduct, dataVariants, setDataVariants,
}) => {
  const [showVariantTable, setShowVariantTable] = useState(false);
  const [variant1, setVariant1] = useState<any>([]);
  const [variant2, setVariant2] = useState<any>([]);

  const inputVariant1Ref = useRef(null);
  const inputVariant2Ref = useRef(null);

  const removeVariantByIdx = (varNum1:boolean, index:number) => {
    if (varNum1) {
      setVariant1(variant1.filter((_:any, id:number) => id !== index));
    } else {
      setVariant2(variant2.filter((_:any, id:number) => id !== index));
    }
  };

  const handleChangeByName = (name:string, value:any) => {
    setProduct((data:any) => ({ ...data, [name]: value }));
  };

  const handleChangeDataVariant = (e:any) => {
    const { name } = e.target;
    const [prop, uniqueID] = name.split('__');
    const variantCode = uniqueID.split('-');
    const tmp = dataVariants[uniqueID] || {
      product_variant_details: {
        variant_1_value: variantCode[0],
        variant_2_value: product.variant_2_name === '' ? '' : variantCode[1],
      },
    };
    if (prop === 'stock' || prop === 'price') {
      tmp.product_variant_details[prop] = parseInt(e.target.value, 10);
    } else {
      tmp.product_variant_details[prop] = e.target.value;
    }
    setDataVariants({ ...dataVariants, [uniqueID]: tmp });
  };

  const cleanVariant = () => {
    setVariant1([]);
    setVariant2([]);
    handleChangeByName('variant_1_name', '');
    handleChangeByName('variant_2_name', '');
    setDataVariants([]);
  };

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
          <RadioBoolean
            name="enable_variant"
            data={showVariantTable}
            handleOnChange={() => {
              cleanVariant();
              handleChangeByName('default_price', '');
              handleChangeByName('default_stock', '');
              setShowVariantTable(!showVariantTable);
            }}
            formType={formType}
          />
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
                      required={variant1.length === 0}
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
                      required={variant1.length === 0}
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
                    {React.createElement(IconClose, {
                      className: 'icon-remove',
                      onClick: () => {
                        cleanVariant();
                      },
                    })}
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
                            setDataVariants([]);
                          }}
                          value={item}
                          readOnly={formType === VoucherConstant.SHOW}
                          disabled={formType === VoucherConstant.SHOW}
                        />
                        {React.createElement(IconClose, {
                          className: 'icon-remove small',
                          onClick: () => {
                            removeVariantByIdx(true, index);
                            setDataVariants([]);
                          },
                        })}
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
                      {React.createElement(IconClose, {
                        className: 'icon-remove',
                        onClick: () => {
                          setVariant2([]);
                          handleChangeByName('variant_2_name', '');
                          setDataVariants([]);
                        },
                      })}
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
                            setDataVariants([]);
                          }}
                          value={item}
                          readOnly={formType === VoucherConstant.SHOW}
                          disabled={formType === VoucherConstant.SHOW}
                        />
                        {React.createElement(IconClose, {
                          className: 'icon-remove small',
                          onClick: () => {
                            removeVariantByIdx(false, index);
                            setDataVariants([]);
                          },
                        })}
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
                      {
                        product.variant_2_name
                          ? (
                            <th className="d-flex gap-3">
                              <div className="variant2">{product.variant_2_name || 'Variasi 2'}</div>
                              <div className="d-flex justify-content-around w-100">
                                <div className="">Harga</div>
                                <div className="">Stok</div>
                                <div className="">Kode Variasi</div>
                              </div>
                            </th>
                          )
                          : (
                            <th className="gap-3 cell-standard">
                              <div className="cell-standard__content">Harga</div>
                              <div className="cell-standard__content">Stok</div>
                              <div className="cell-standard__content">Kode Variasi</div>
                            </th>
                          )
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {
                      variant1.map((item:any, index:string) => (
                        <tr className="cell-content__row" key={`${item}${index + 1}`}>
                          <td className="border pt-4">{item}</td>
                          { product.variant_2_name !== '' ? (
                            <>
                              {
                            variant2.map((item2: any, index2: string) => (
                              <tr key={`${item2}${index + 1}`}>
                                {
                                  product.variant_2_name
                                  && (
                                    <td className="variant2 pt-4 px-4">
                                      {item2}
                                      {() => setDataVariants({ ...dataVariants, [index + index2]: '' })}
                                    </td>
                                  )
                                }
                                <td className="py-3">
                                  <div className="gap-3 cell-standard">
                                    <div>
                                      <div className="input-group prefix">
                                        <span className="input-group-addon">Rp</span>
                                        <input
                                          name={`price__${item}-${item2}-${index}-${index2}`}
                                          className="form__input"
                                          placeholder="Masukkan angka"
                                          type="number"
                                          required
                                          min={99}
                                          value={dataVariants[`${item}-${item2}-${index}-${index2}`]?.price}
                                          onChange={handleChangeDataVariant}
                                          readOnly={formType === VoucherConstant.SHOW}
                                          disabled={formType === VoucherConstant.SHOW}
                                        />
                                      </div>
                                    </div>
                                    <div>
                                      <div>
                                        <div className="input-group suffix">
                                          <input
                                            name={`stock__${item}-${item2}-${index}-${index2}`}
                                            className="form__input"
                                            placeholder="Masukkan angka"
                                            type="number"
                                            required
                                            onChange={handleChangeDataVariant}
                                            min={1}
                                            value={dataVariants[`${item}-${item2}-${index}-${index2}`]?.stock}
                                            readOnly={formType === VoucherConstant.SHOW}
                                            disabled={formType === VoucherConstant.SHOW}
                                          />
                                          <span className="input-group-addon">pcs</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <input
                                        name={`variant_code__${item}-${item2}-${index}-${index2}`}
                                        className="form__input"
                                        placeholder="Masukkan kode"
                                        type="text"
                                        required
                                        value={dataVariants[`${item}-${item2}-${index}-${index2}`]?.variant_code}
                                        onChange={handleChangeDataVariant}
                                        readOnly={formType === VoucherConstant.SHOW}
                                        disabled={formType === VoucherConstant.SHOW}
                                      />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))
                          }
                            </>
                          )
                            : (
                              <td>
                                <div className="gap-3 cell-standard">
                                  <div>
                                    <div className="input-group prefix">
                                      <span className="input-group-addon">Rp</span>
                                      <input
                                        name={`price__${item}-${index}`}
                                        className="form__input"
                                        placeholder="Masukkan angka"
                                        type="number"
                                        min={99}
                                        required
                                        value={dataVariants[`${item}-${index}`]?.price}
                                        onChange={handleChangeDataVariant}
                                        readOnly={formType === VoucherConstant.SHOW}
                                        disabled={formType === VoucherConstant.SHOW}
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <div>
                                      <div className="input-group suffix">
                                        <input
                                          name={`stock__${item}-${index}`}
                                          className="form__input"
                                          placeholder="Masukkan angka"
                                          type="number"
                                          required
                                          min={1}
                                          value={dataVariants[`${item}-${index}`]?.stock}
                                          onChange={handleChangeDataVariant}
                                          readOnly={formType === VoucherConstant.SHOW}
                                          disabled={formType === VoucherConstant.SHOW}
                                        />
                                        <span className="input-group-addon">pcs</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <input
                                      name={`variant_code__${item}-${index}`}
                                      className="form__input"
                                      placeholder="Masukkan kode"
                                      type="text"
                                      required
                                      value={dataVariants[`${item}-${index}`]?.variant_code}
                                      onChange={handleChangeDataVariant}
                                      readOnly={formType === VoucherConstant.SHOW}
                                      disabled={formType === VoucherConstant.SHOW}
                                    />
                                  </div>
                                </div>
                              </td>
                            )}
                        </tr>
                      ))
}
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
