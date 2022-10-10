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
          <CardStatistic title="Penjualan" data="Rp 40.000.000" tooltip="Nilai total dari semua pesanan siap dikirim menggunakan Voucher yang ditanggung oleh Penjual, termasuk ongkos kirim dan tidak termasuk promosi lainnya, selama periode waktu yang dipilih." />
        </div>
        <div className="col-4">
          <CardStatistic title="Pesanan" data="131" tooltip="Jumlah voucher yang ditanggung Penjual yang digunakan pada pesanan selama jangka waktu tertentu." />
        </div>
        <div className="col-4">
          <CardStatistic title="Pembeli" data="120" tooltip="Jumlah Pembeli yang menggunakan setidaknya 1 voucher yang ditanggung Penjual pada pesanan selama jangka waktu tertentu." />
        </div>
      </div>
    </div>
  );
export default StatsVoucher;
