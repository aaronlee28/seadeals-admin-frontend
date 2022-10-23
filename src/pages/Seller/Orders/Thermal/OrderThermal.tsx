import React, { useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import ThermalDocument, { Thermal } from '../../../../components/PDF/Thermal/ThermalDocument';
import useAxiosPrivateWithoutNavigate from '../../../../hooks/useAxiosPrivateWithoutNavigation';

const UserOrder = () => {
  const { id } = useParams();

  const [data, setData] = useState<Thermal>({
    buyer: { address: '', city: '', name: '' },
    delivery_number: '',
    origin_city: '',
    products: [],
    seller_name: '',
    total_weight: 0,
  });
  const [thermalLoading, setThermalLoading] = useState<boolean>(true);

  const axiosPrivate = useAxiosPrivateWithoutNavigate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getReceipt = async () => {
      try {
        const response = await axiosPrivate.get(`seller/orders/thermal/${id}`, {
          signal: controller.signal,
        });
        const result = response.data;
        if (isMounted) {
          setThermalLoading(false);
          setData(result.data);
        }
      } catch (err) {
        toast.error('Gagal Memuat Thermal Order');
      }
    };
    getReceipt().then();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  if (thermalLoading) return <div>Loading...</div>;

  return (
    <div className="d-flex my-4 col-8">
      <PDFDownloadLink document={<ThermalDocument data={data} />} fileName="thermal.pdf">
        {({ loading }) => ((loading || thermalLoading) ? 'Loading...' : 'Donwload')}
      </PDFDownloadLink>
    </div>
  );
};

export default UserOrder;
