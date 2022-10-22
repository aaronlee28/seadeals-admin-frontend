import React, { FC } from 'react';

const InputVariantRow:FC<any> = ({
  index, index2, handleChangeDataVariant, dataVariants,
}) => {
  const uniqueID = `${index}-${index2}`;

  console.log('AFTER: ', dataVariants);
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
            value={dataVariants[uniqueID]?.price}
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
              value={dataVariants[uniqueID]?.stock}
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
          value={dataVariants[uniqueID]?.variant_code}
        />
      </div>
    </div>
  );
};

export default InputVariantRow;
