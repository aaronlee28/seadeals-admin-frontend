import React, { FC } from 'react';
import RadioBoolean from '../../../../components/RadioBoolean/RadioBoolean';
import PRODUCT_STATUS from '../../../../constants/product';

const ProductOtherInfo:FC<any> = ({ product, handleOnChange }) => (
  <div className="my-4">
    <h5 className="text-start"><b>Informasi Lainnya</b></h5>
    <div className="row my-3">
      <label className="col-3 text-end align-self-center" htmlFor="weight">Berat</label>
      <div className="col-9">
        <div className="row">
          <div className="input-group suffix small p-0">
            <input
              name="weight"
              className="form__input p-2"
              placeholder="Masukkan berat produk"
              type="number"
              onChange={handleOnChange}
              required
              value={product.weight}
              max={10000}
            />
            <span className="input-group-addon">gr</span>
          </div>
        </div>
      </div>
    </div>
    <div className="row my-3">
      <label className="col-3 text-end align-self-center">Ukuran</label>
      <div className="col-9 p-0">
        <div className="d-flex flex-row gap-3 align-items-center p-0">
          <div className="input-group suffix small p-0">
            <input
              name="length"
              className="form__input p-2"
              placeholder="Panjang"
              type="number"
              onChange={handleOnChange}
              required
              value={product.length}
              max={100000}
            />
            <span className="input-group-addon">cm</span>
          </div>
          <span className="text-start text-secondary-blue">X</span>
          <div className="input-group suffix small p-0">
            <input
              name="width"
              className="form__input p-2"
              placeholder="Lebar"
              type="number"
              onChange={handleOnChange}
              required
              value={product.width}
              max={100000}
            />
            <span className="input-group-addon">cm</span>
          </div>
          <span className="text-start text-secondary-blue">X</span>
          <div className="input-group suffix small p-0">
            <input
              name="height"
              className="form__input p-2"
              placeholder="Tinggi"
              type="number"
              onChange={handleOnChange}
              required
              value={product.height}
              max={100000}
            />
            <span className="input-group-addon">cm</span>
          </div>
        </div>
      </div>
    </div>
    <div className="row my-3">
      <label className="col-3 text-end align-self-center" htmlFor="photo">Produk Berbahaya</label>
      <div className="col-9 p-0">
        <RadioBoolean name="is_hazardous" data={product.is_hazardous} handleOnChange={handleOnChange} />
      </div>
    </div>
    <div className="row my-3">
      <label className="col-3 text-end align-self-center" htmlFor="photo">Kondisi Produk</label>
      <div className="col-9 p-0">
        <select className="form-select mb-2" name="condition_status" required onChange={handleOnChange}>
          <option>Pilih kondisi</option>
          {PRODUCT_STATUS.map((item) => (
            <option
              key={item.id}
              value={item.name}
            >
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  </div>
);

export default ProductOtherInfo;
