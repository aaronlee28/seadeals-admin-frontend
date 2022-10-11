import React, { FC } from 'react';
import './Toggle.scss';

interface ToggleProps {
  id: string
}

const Toggle:FC<ToggleProps> = ({ id }) => (
  <>
    <input type="checkbox" id={id} className="toggle-switch" defaultChecked />
    <label htmlFor={id} className="toggle-label">Toggle</label>
  </>
);

export default Toggle;
