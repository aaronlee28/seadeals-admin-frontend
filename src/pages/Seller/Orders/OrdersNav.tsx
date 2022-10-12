import React, { FC } from 'react';
import Button from '../../../components/Button/Button';
import ORDER_FILTER from '../../../constants/orderFilter';

interface OrdersNavProps {
  setParam: (param:any)=>void
  active: string
}

const OrdersNav:FC<OrdersNavProps> = ({ setParam, active }) => {
  const handleNavClick = (param:string) => {
    setParam(param);
  };

  return (
    <div className="container bg-white text-start border-bottom">
      <div className="p-4 d-flex gap-4">
        <Button
          text="Semua"
          buttonType={`navtab ${active === ORDER_FILTER.ALL && 'active'}`}
          handleClickedButton={() => handleNavClick(ORDER_FILTER.ALL)}
        />
        <Button
          text="Perlu Diproses"
          buttonType={`navtab ${active === ORDER_FILTER.WAIT_SELLER && 'active'}`}
          handleClickedButton={() => handleNavClick(ORDER_FILTER.WAIT_SELLER)}
        />
        <Button
          text="Selesai"
          buttonType={`navtab ${active === ORDER_FILTER.DONE && 'active'}`}
          handleClickedButton={() => handleNavClick(ORDER_FILTER.DONE)}
        />
        <Button
          text="Direfund"
          buttonType={`navtab ${active === ORDER_FILTER.REFUNDED && 'active'}`}
          handleClickedButton={() => handleNavClick(ORDER_FILTER.REFUNDED)}
        />
        <Button
          text="Sampai"
          buttonType={`navtab ${active === ORDER_FILTER.DELIVERED && 'active'}`}
          handleClickedButton={() => handleNavClick(ORDER_FILTER.DELIVERED)}
        />
      </div>
    </div>
  );
};

export default OrdersNav;
