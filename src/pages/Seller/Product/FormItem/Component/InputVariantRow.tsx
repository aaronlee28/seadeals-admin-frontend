import React, { FC } from 'react';

const InputVariantRow:FC<any> = ({
  item, item2, index, index2, handleChangeDataVariant,
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
            />
            <span className="input-group-addon">pcs</span>
          </div>
        </div>
      </div>
      <div>
        <input
          name={`variant_code__${uniqueID}`}
          className="form__input rounded"
          placeholder="Masukkan kode"
          type="text"
          required
          onChange={handleChangeDataVariant}
        />
      </div>
    </div>
  );
};

export default InputVariantRow;
