import React, { FC } from 'react';
import useAuth from '../../../../hooks/useAuth';
import '../Voucher.scss';

const VoucherBasicInfo:FC<any> = ({ voucher, formType, handleOnChange }) => {
  const timeNow = `${new Date().toISOString().split('.')[0]}`;
  const auth = useAuth();
  const prefixCode = auth.auth.user.username.substring(0, 4).toUpperCase();

  return (
    <div className="my-4">
      <h5 className="text-start"><b>Rincian Dasar</b></h5>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center" htmlFor="name">Nama voucher</label>
        <input
          name="name"
          className="col-9 border rounded p-2"
          maxLength={100}
          placeholder="Masukkan nama voucher"
          type="text"
          required
          readOnly={formType === 'show'}
          disabled={formType === 'show'}
          onChange={handleOnChange}
        />
      </div>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center" htmlFor="code">Kode voucher</label>
        <div className="col-9">
          <div className="row">
            <div className="input-group prefix p-0">
              <span className="input-group-addon">{prefixCode}</span>
              <input
                className="form__input"
                name="code"
                maxLength={5}
                pattern="[a-zA-Z0-9]+"
                placeholder="Masukkan kode voucher"
                type="text"
                required
                readOnly={formType !== 'create'}
                disabled={formType !== 'create'}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className="row">
            {`Masukkan A-Z, 0-9; maksimum 5 karakter
              \n Kode voucher Anda adalah: ${prefixCode + voucher.code}`}
          </div>
        </div>
      </div>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center" htmlFor="start_date">Periode voucher</label>
        <input
          name="start_date"
          className="col-4 border rounded p-2"
          defaultValue={timeNow}
          min={timeNow}
          step={1}
          type="datetime-local"
          required
          readOnly={formType === 'show'}
          disabled={formType === 'show'}
          onChange={handleOnChange}
        />
        <span className="col-1 p-2"> - </span>
        <input
          name="end_date"
          className="col-4 border rounded p-2"
          defaultValue={timeNow}
          min={voucher.start_date}
          step={1}
          type="datetime-local"
          required
          readOnly={formType === 'show'}
          disabled={formType === 'show'}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};

export default VoucherBasicInfo;
