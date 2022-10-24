import React, { FC } from 'react';

const InputPreSuffix:FC<any> = ({ value, unit, isSuffix }) => {
  const val = value || 'Tidak tersedia';
  return (
    <div className={`input-group ${isSuffix ? 'suffix' : 'prefix'} p-0`}>
      {!isSuffix && <span className="input-group-addon">{unit}</span>}
      <input
        className="form__input"
        value={val}
        disabled
        readOnly
      />
      {isSuffix && <span className="input-group-addon">{unit}</span>}
    </div>
  );
};

export default InputPreSuffix;
