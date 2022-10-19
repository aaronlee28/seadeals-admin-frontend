import React, { FC } from 'react';
import VoucherConstant from '../../constants/voucher';

const RadioBoolean:FC<any> = ({
  name, data, handleOnChange, formType,
}) => (
  <div className="d-flex gap-3">
    <div>
      <input
        type="radio"
        name={name}
        onChange={handleOnChange}
        value="true"
        checked={data}
      />
      <label htmlFor="hazardous" className="mx-1">Ya</label>
      <br />
    </div>
    <div>
      <input
        type="radio"
        name={name}
        onChange={handleOnChange}
        value=""
        readOnly={formType === VoucherConstant.SHOW}
        disabled={formType === VoucherConstant.SHOW}
        checked={!data}
      />
      <label htmlFor="not_hazardous" className="mx-1">Tidak</label>
      <br />
    </div>
  </div>
);

export default RadioBoolean;
