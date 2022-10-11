import React, { useEffect } from 'react';
import courierIcon from '../../../../assets/svg/courier.svg';
import printIcon from '../../../../assets/svg/print.svg';
import DeliveryTypeItems from './DeliveryTypeItems';
import './DeliverySettings.scss';
import Button from '../../../../components/Button/Button';
import Toggle from '../../../../components/Toggle/Toggle';

const DeliverySettings = () => {
  useEffect(() => {

  }, []);

  return (
    <div className="py-4">
      <div className="container bg-white text-start border-bottom-dashed">
        <div className="p-4">
          <p className="fs-4 fw-bold mb-1">Pengaturan Pengiriman</p>
          <p className="text-secondary">Atur Pengiriman pada Toko Anda</p>
        </div>
      </div>
      <div className="container bg-white text-start">
        <div className="p-4">
          <div className="d-flex align-items-center gap-4 mb-4">
            <img src={courierIcon} alt="Jasa Kirim" height="46px" />
            <div className="">
              <p className="fw-bold fs-5">Jasa Kirim</p>
              <p className="fs-6 text-secondary">Atur Jasa Kirim yang Anda Inginkan</p>
            </div>
          </div>
          <div className="">
            <div className="mb-4">
              <p className="fw-bold fs-5">Reguler</p>
              <p className="fs-6 text-secondary mb-2">Jasa kirim tipe Reguler</p>
              <DeliveryTypeItems />
            </div>
            <div className="mb-4">
              <p className="fw-bold fs-5">Hemat</p>
              <p className="fs-6 text-secondary mb-2">Jasa kirim tipe Reguler</p>
              <DeliveryTypeItems />
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div className="d-flex align-items-center gap-4">
              <img src={printIcon} alt="Jasa Kirim" height="46px" />
              <div className="">
                <p className="fw-bold fs-5">Cetak Mode Thermal</p>
                <p className="fs-6 text-secondary">Aktifkan Cetak Mode Thermal jika kamu ingin mencetak label pengiriman untuk semua jasa kirim.</p>
              </div>
            </div>
            <Toggle id="thermal" />
          </div>
          <Button buttonType="primary ms-auto" text="Simpan Perubahan" handleClickedButton={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default DeliverySettings;
