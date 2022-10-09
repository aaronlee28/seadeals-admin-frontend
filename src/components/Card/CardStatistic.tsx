import React, { FC } from 'react';
import { ReactComponent as IconHelp } from '../../assets/svg/help.svg';

const CardStatistic:FC<any> = ({ title, data }) => (
  <div className="card shadow-sm text-start">
    <div className="card-body">
      <p className="card-title">
        <b>{title}</b>
        <IconHelp />
      </p>
      <p className="card-text">{data}</p>
    </div>
  </div>
);

export default CardStatistic;
