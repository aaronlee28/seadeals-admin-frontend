import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../../../api/axios';
import useAuth from '../../../hooks/useAuth';

const VOUCHERS_URL = 'vouchers';

const FormVoucher = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const timeNow = `${new Date().toISOString().split('.')[0]}`;
  const auth = useAuth();
  const prefixCode = auth.auth.user.username.substring(0, 4).toUpperCase();

  const [voucher, setVoucher] = useState({
    name: '',
    code: '',
    start_date: '',
    end_date: '',
    quota: 1,
    amount_type: 'percentage',
    amount: 1,
    min_spending: 0,
  });

  const handleOnChange = (e: any) => {
    if (e.target.name === 'code') {
      e.target.value = e.target.value.toUpperCase();
    }

    setVoucher({
      ...voucher,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axiosPrivate.post(
        VOUCHERS_URL,
        JSON.stringify({
          ...voucher,
          quota: Number(voucher.quota),
          amount: Number(voucher.amount),
          min_spending: Number(voucher.min_spending),
          start_date: `${voucher.start_date}Z`,
          end_date: `${voucher.end_date}Z`,
        }),
      );
      console.log(response);
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="my-4">
          <h5 className="text-start"><b>Rincian Dasar</b></h5>
          <div className="row my-3">
            <label className="col-3 text-end" htmlFor="name">Nama voucher</label>
            <input name="name" className="col-9 border rounded p-2" maxLength={100} placeholder="Masukkan nama voucher" type="text" required onChange={handleOnChange} />
          </div>
          <div className="row my-3">
            <label className="col-3 text-end" htmlFor="code">Kode voucher</label>
            <div className="col-9">
              <div className="row border rounded">
                <input className="col-3 p-2" defaultValue={prefixCode} type="text" disabled readOnly />
                <input
                  className="col-9 p-2"
                  name="code"
                  maxLength={5}
                  pattern="[a-zA-Z0-9]+"
                  placeholder="Masukkan kode voucher"
                  type="text"
                  required
                  onChange={handleOnChange}
                />
              </div>
              <div className="row">
                {`Masukkan A-Z, 0-9; maksimum 5 karakter
              \n Kode voucher Anda adalah: ${prefixCode + voucher.code}`}
              </div>
            </div>
          </div>
          <div className="row my-3">
            <label className="col-3 text-end" htmlFor="start_date">Periode voucher</label>
            <input name="start_date" className="col-4 border rounded p-2" min={timeNow} step={1} type="datetime-local" required onChange={handleOnChange} />
            <span className="col-1 p-2"> - </span>
            <input name="end_date" className="col-4 border rounded p-2" min={voucher.start_date} step={1} type="datetime-local" required onChange={handleOnChange} />
          </div>
        </div>
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
                {voucher.amount_type === 'nominal' && <input className="col-1 text-end border" defaultValue="Rp" type="text" disabled readOnly />}
                <input name="amount" className="col-8 p-2" max={voucher.amount_type === 'percentage' ? 100 : undefined} placeholder="Masukkan angka" type="number" onChange={handleOnChange} required />
                {voucher.amount_type === 'percentage' && <input className="col-1  text-end border" defaultValue="%" type="text" disabled readOnly />}
              </div>
            </div>
          </div>
          <div className="row my-3">
            <label className="col-3 text-end" htmlFor="quota">Kuota voucher</label>
            <input name="quota" className="col-9 border rounded p-2" type="number" placeholder="Masukkan angka" required onChange={handleOnChange} />
          </div>
          <div className="row my-3">
            <label className="col-3 text-end" htmlFor="min_spending">Minimal pembelian</label>
            <input className="col-1 text-end border" defaultValue="Rp" type="text" disabled readOnly />
            <input name="min_spending" className="col-8 border p-2" placeholder="Masukkan angka" type="number" required onChange={handleOnChange} />
          </div>
        </div>
        <div className="d-flex flex-row-reverse">
          <button className="me-0 btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
export default FormVoucher;
