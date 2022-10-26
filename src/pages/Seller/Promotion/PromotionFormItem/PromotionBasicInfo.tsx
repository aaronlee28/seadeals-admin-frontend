import React, { FC } from 'react';
import '../Promotions.scss';
import VoucherConstant from '../../../../constants/voucher';

const PromotionBasicInfo:FC<any> = ({ promotion, formType, handleOnChange }) => {
  const timeNow = `${new Date().toISOString().split('.')[0]}`;

  return (
    <div className="my-4">
      <h5 className="text-start"><b>Rincian Dasar</b></h5>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center" htmlFor="name">Nama Promosi</label>
        <input
          name="name"
          className="col-9 border rounded p-2"
          maxLength={100}
          placeholder="Masukkan nama promosi"
          type="text"
          required
          value={promotion.name}
          readOnly={formType === VoucherConstant.SHOW}
          disabled={formType === VoucherConstant.SHOW}
          onChange={handleOnChange}
        />
      </div>
      <div className="row my-3">
        <label className="col-3 text-end" htmlFor="code">Deskripsi</label>
        <div className="col-9">
          <div className="row">
            <div className="input-group prefix p-0">
              <textarea
                className="form__input form-control"
                name="description"
                maxLength={255}
                placeholder="Masukkan deskripsi promosi"
                required
                value={promotion.description}
                readOnly={formType !== VoucherConstant.CREATE}
                disabled={formType !== VoucherConstant.CREATE}
                onChange={handleOnChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center" htmlFor="start_date">Periode promosi</label>
        <input
          name="start_date"
          className="col-4 border rounded p-2"
          min={timeNow}
          type="datetime-local"
          required
          step={1}
          value={promotion.start_date ? promotion.start_date : timeNow}
          readOnly={formType === VoucherConstant.SHOW}
          disabled={formType === VoucherConstant.SHOW}
          onChange={handleOnChange}
        />
        <span className="col-1 p-2"> - </span>
        <input
          name="end_date"
          className="col-4 border rounded p-2"
          min={promotion.start_date}
          type="datetime-local"
          step={1}
          required
          value={promotion.end_date ? promotion.end_date : timeNow}
          readOnly={formType === VoucherConstant.SHOW}
          disabled={formType === VoucherConstant.SHOW}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};

export default PromotionBasicInfo;
