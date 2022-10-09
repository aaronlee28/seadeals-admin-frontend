import React, { FC } from 'react';
import Button from '../Button/Button';

const Confirmation:FC<any> = ({ text, handleClose, handleConfirm }) => (
  <div className="text-center p-4">
    <span>{text}</span>
    <div className="d-flex justify-content-end gap-3 my-2">
      <Button buttonType="secondary alt" handleClickedButton={handleClose} text="Tidak" />
      <Button buttonType="primary" handleClickedButton={handleConfirm} text="Ya" />
    </div>
  </div>
);

export default Confirmation;
