import './Couriers.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Button from '../../../components/Button/Button';

const Couriers = () => {
  const axiosPrivate = useAxiosPrivate();
  const [couriers, setCouriers] = useState<any[]>([]);
  const navigate = useNavigate();

  const getCouriers = () => {
    try {
      axiosPrivate.get(
        '/couriers',
      ).then((res: any) => {
        setCouriers(res.data.data);
        console.log(res);
      });
    } catch (err) {
      navigate('/seller/register/couriers', { replace: true });
    }
  };

  const [courierId, setCourierId] = useState('');
  useEffect(() => {
    getCouriers();
  }, []);

  const handleDone = () => {
    try {
      axiosPrivate.post(
        'sellers/couriers',
        JSON.stringify({
          courier_id: Number(courierId),
          is_selected: true,
        }),
        {
          withCredentials: true,
        },
      );
      console.log(JSON.stringify({
        courier_id: Number(courierId),
        is_selected: true,
      }));
      navigate('/seller', { replace: true });
    } catch (err) {
      navigate('/seller/register/couriers', { replace: true });
    }
  };

  return (
    <div className="couriers_container">
      <div>
        <form>
          <div className="form-group">
            <label className="mb-4">Pilih jasa kurir:</label>
            <br />
            <select onChange={(event) => setCourierId(event.target.value)}>
              {couriers.map((courier) => (
                <option key={courier.id} value={courier.id}>
                  {courier.name}
                </option>
              ))}
            </select>
            <Button buttonType="primary" text="Selesai" handleClickedButton={handleDone} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Couriers;
