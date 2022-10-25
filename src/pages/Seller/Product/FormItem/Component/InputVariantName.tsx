import React, { FC } from 'react';
import { ReactComponent as IconClose } from '../../../../../assets/svg/icon_close.svg';

const InputVariantName:FC<any> = ({
  variantRef, variant, setVariant, index, setDataVariants, removeVariantByIdx,
}) => (
  <div className="d-flex">
    <input
      ref={variantRef}
      className="form__input p-2 my-1 rounded"
      placeholder="Masukkan variasi"
      type="text"
      maxLength={20}
      onChange={(e) => {
        const variant1Tmp = [...variant];
        variant1Tmp[index] = e.target.value;
        setVariant(variant1Tmp);
      }}
      required
    />
    {React.createElement(IconClose, {
      className: 'icon-remove small',
      onClick: () => {
        removeVariantByIdx(true, index);
        setDataVariants({});
      },
    })}
  </div>
);

export default InputVariantName;
