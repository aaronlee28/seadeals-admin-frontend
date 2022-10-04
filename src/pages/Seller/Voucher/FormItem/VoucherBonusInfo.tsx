import React, { FC } from 'react';
import '../Voucher.scss';

const VoucherBonusInfo:FC<any> = ({ voucher, handleOnChange }) => (
  <div className="my-4">
    <h5 className="text-start"><b>Pengaturan bonus</b></h5>
    <div className="row my-3">
      <label className="col-3 text-end" htmlFor="amount_type">Tipe voucher</label>
      <div className="col-9">
        <div className="row border rounded">
          <select name="amount_type" className="col-3 p-2 border-0" onChange={handleOnChange} required>
            <option value="percentage">persentase</option>
            <option value="nominal">nominal</option>
          </select>
          {voucher.amount_type === 'nominal' && <input className="col text-end affix" defaultValue="Rp" type="text" disabled readOnly />}
          <input name="amount" className="col-7 col-xl-8 p-2" max={voucher.amount_type === 'percentage' ? 100 : undefined} placeholder="Masukkan angka" type="number" onChange={handleOnChange} required />
          {voucher.amount_type === 'percentage' && <input className="col text-end border" defaultValue="%" type="text" disabled readOnly />}
        </div>
      </div>
    </div>
    <div className="row my-3">
      <label className="col-3 text-end" htmlFor="quota">Kuota voucher</label>
      <input name="quota" className="col-9 border rounded p-2" type="number" placeholder="Masukkan angka" required onChange={handleOnChange} />
    </div>
    <div className="row my-3">
      <label className="col-3 text-end" htmlFor="min_spending">Minimal pembelian</label>
      <input className="col text-end border" defaultValue="Rp" type="text" disabled readOnly />
      <input name="min_spending" className="col-7 col-xl-8 border p-2" placeholder="Masukkan angka" type="number" required onChange={handleOnChange} />
    </div>
  </div>
);

export default VoucherBonusInfo;
