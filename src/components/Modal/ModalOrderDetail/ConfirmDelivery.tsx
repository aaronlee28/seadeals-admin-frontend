import React, { FC, useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import toast from 'react-hot-toast';
import Button from '../../Button/Button';
import DeliveryInfoItem from './DeliveryInfoItem';
import dateFormatter from '../../../utils/dateFormatter';
import formatter from '../../../utils/formatter';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Thermal from '../../../constants/thermal';
import ThermalDocument from '../../PDF/Thermal/ThermalDocument';

interface Props {
  closeDelivery: ()=>void,
  order: any,
  setShowModal: (isShow:boolean)=>void,
  refreshData: ()=>void,
}

const ConfirmDelivery:FC<Props> = ({
  closeDelivery, order, setShowModal, refreshData,
}) => {
  const axiosPrivate = useAxiosPrivate();

  const [loadingDelivery, setLoadingDelivery] = useState(false);

  const deliverOrder = async () => {
    if (loadingDelivery) return;
    try {
      setLoadingDelivery(true);
      toast.loading('Memperbarui Status Pengiriman..');
      await axiosPrivate.post(
        'seller/deliver/order',
        JSON.stringify({ order_id: order.id }),
      );
      refreshData();
      setShowModal(false);
      toast.dismiss();
      toast.success('Status Pengiriman Diperbarui');
    } catch (e) {
      toast.dismiss();
      toast.error('Gagal Mengubah Status Pengiriman');
    }
  };

  const [thermal, setThermal] = useState<Thermal>({
    buyer: {
      city: '',
      name: '',
      address: '',
    },
    courier: {
      code: '',
      name: '',
    },
    delivery_number: '',
    issued_at: '',
    origin_city: '',
    price: 0,
    products: [],
    seller_name: '',
    total_weight: 0,
  });

  let isMounted = true;
  const controller = new AbortController();
  const [loadingThermal, setLoadingThermal] = useState(false);
  const getThermal = async () => {
    try {
      setLoadingThermal(true);
      const response = await axiosPrivate.get(
        `seller/orders/thermal/${order.id}`,
        { signal: controller.signal },
      );
      const result = response.data;
      if (isMounted) {
        setThermal(result.data);
        setLoadingThermal(false);
      }
    } catch (e) {
      setLoadingThermal(false);
      toast.dismiss();
      toast.error('Gagal Mengambil Thermal Pengiriman');
    }
  };

  useEffect(() => {
    getThermal().then();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const notDelivered = order?.status === 'waiting for seller';
  return (
    <div className="pe-4 me-1">
      <div className="d-flex justify-content-between mb-4">
        <h4 className="fw-bold">Kirim Pesanan</h4>
        <Button
          buttonType="plain text-main"
          text="Kembali ke Rincian"
          handleClickedButton={() => closeDelivery()}
        />
      </div>
      <div className="">
        <p className="p-3 border rounded bg-light mb-3">
          <span className="fw-bold">Status: </span>
          {formatter.FormatTitle(order?.status)}
        </p>
        <p className="fw-bold mb-3 fs-5">Opsi Pengiriman:</p>
        <div className="p-3 border rounded shadow-sm mb-4">
          <p className="mb-2 fw-bold">Antar ke Counter</p>
          <p>{`Anda dapat mengirimkan paket Anda di cabang ${order?.delivery?.courier} Reguler terdekat di kota Anda.`}</p>
        </div>
        <p className="fw-bold mb-3 fs-5">Informasi Pengiriman:</p>
        <div className="p-3 border rounded shadow-sm mb-4">
          <div className="row">
            <div className="col-4">
              <DeliveryInfoItem header="Kurir" value={order?.delivery?.courier} />
              <DeliveryInfoItem header="Tanggal" value={dateFormatter.getTimeNow()} />
            </div>
            <div className="col-5">
              <DeliveryInfoItem header="Tipe Pengiriman" value="Reguler" />
              <DeliveryInfoItem header="Tujuan Pengiriman" value={order?.delivery?.destination_address} />
            </div>
          </div>
        </div>
        <div className="d-flex">
          {!notDelivered && !loadingThermal && (
          <PDFDownloadLink document={<ThermalDocument data={thermal} />} fileName="thermal.pdf">
            {loadingThermal ? (
              <div>
                Loading...
              </div>
            ) : (
              <Button
                buttonType="plain text-main"
                handleClickedButton={() => {}}
                text="Cetak Resi"
              />
            )}

          </PDFDownloadLink>
          )}
          {notDelivered && (
          <Button
            buttonType={`secondary ms-auto ${loadingDelivery && 'disabled'}`}
            handleClickedButton={() => deliverOrder()}
            text="Konfirmasi Pengiriman"
          />
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelivery;
