import React from 'react';
import CardStatistic from '../../../../components/Card/CardStatistic';

const StatsVoucher = () =>
// const axiosPrivate = useAxiosPrivate();
// const [stats, setStats] = useState({});
//
// const fetchVoucherStats = async () => {
//   await VoucherAPI.Stats(axiosPrivate)
//     .then((resp:any) => {
//       const { data } = resp.data;
//       setStats(data);
//     })
//     .catch((err:any) => err);
// };

// useEffect(() => {
//   fetchVoucherStats().then();
// }, []);

  // eslint-disable-next-line implicit-arrow-linebreak
  (
    <div className="container text-start">
      <h5 className="m-0">Statistik Voucher</h5>
      <p className="mb-4 p-0">Statistik voucher toko untuk periode ...</p>
      <div className="row">
        <div className="col-4">
          <CardStatistic title="Penjualan" data="Rp 40.000.000" />
        </div>
        <div className="col-4">
          <CardStatistic title="Pesanan" data="131" />
        </div>
        <div className="col-4">
          <CardStatistic title="Pembeli" data="120" />
        </div>
      </div>
    </div>
  );
export default StatsVoucher;
