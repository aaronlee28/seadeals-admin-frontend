import React from 'react';
import './Toggle.scss';
import VoucherConstant from '../../constants/voucher';

type ToggleRequiredProps = {
  value: string,
  inputID: string,
  handleOnChange: () => void;
};

type ToggleOptionalProps = {
  formType?: string;
};

interface ToggleProps
  extends ToggleRequiredProps,
  ToggleOptionalProps {}

const defaultProps: ToggleOptionalProps = {
  formType: '',
};

const Toggle = (props: ToggleProps) => {
  const {
    value, inputID, handleOnChange, formType,
  } = props;
  return (
    <>
      <input
        type="checkbox"
        id={inputID}
        name={inputID}
        className="toggle-switch"
        value={value}
        readOnly={formType === VoucherConstant.SHOW}
        disabled={formType === VoucherConstant.SHOW}
        onChange={handleOnChange}
      />
      <label htmlFor={inputID} className="toggle-label">Toggle</label>
    </>
  );
};
Toggle.defaultProps = defaultProps;

export default Toggle;
