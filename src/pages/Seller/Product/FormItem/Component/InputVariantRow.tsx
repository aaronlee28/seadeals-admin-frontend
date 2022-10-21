import React, { FC } from 'react';
import VoucherConstant from '../../../../../constants/voucher';

const InputVariantRow:FC<any> = ({
  item, item2, index, index2, handleChangeDataVariant, formType,
}) => {
  const uniqueID = index2 && item2 ? `${item}-${item2}-${index}-${index2}` : `${item}-${index}`;
  return (
    <div className="gap-3 cell-standard">
      <div>
        <div className="input-group prefix">
          <span className="input-group-addon">Rp</span>
          <input
            name={`price__${uniqueID}`}
            className="form__input"
            placeholder="Masukkan angka"
            type="number"
            required
            min={99}
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
              name={`stock__${uniqueID}`}
              className="form__input"
              placeholder="Masukkan angka"
              type="number"
              required
              onChange={handleChangeDataVariant}
              min={1}
              readOnly={formType === VoucherConstant.SHOW}
              disabled={formType === VoucherConstant.SHOW}
            />
            <span className="input-group-addon">pcs</span>
          </div>
        </div>
      </div>
      <div>
        <input
          name={`variant_code__${uniqueID}`}
          className="form__input"
          placeholder="Masukkan kode"
          type="text"
          required
          onChange={handleChangeDataVariant}
          readOnly={formType === VoucherConstant.SHOW}
          disabled={formType === VoucherConstant.SHOW}
        />
      </div>
    </div>
  );
};

export default InputVariantRow;
