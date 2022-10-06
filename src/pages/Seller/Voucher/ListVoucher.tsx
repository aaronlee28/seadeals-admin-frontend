import React, { FC } from 'react';
import Formatter from '../../../utils/formatter';

const ListVoucher:FC<any> = ({ vouchers }) => (
  <div className="container">
    <table className="table table-hover voucher__table">
      <caption>List of shop voucher</caption>
      <thead>
        <tr className="table-secondary">
          <th>Nama Voucher | Kode</th>
          <th>Diskon</th>
          <th>Kuota Pemakaian</th>
          <th>Status | Periode Voucher</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {
            vouchers.length === 0
              ? <tr><td colSpan={5}>No vouchers</td></tr>
              : vouchers.map((v:any) => (
                <tr key={v.id}>
                  <td>
                    <div className="d-flex flex-column text-start">
                      <span>{v.name}</span>
                      <span>{`Kode: ${v.code}`}</span>
                    </div>
                  </td>
                  <td>
                    {v.amount_type === 'percentage' && <span>{`${v.amount}%`}</span>}
                    {v.amount_type === 'nominal' && <span>{`${Formatter.DisplayPrice(v.amount)}`}</span>}
                  </td>
                  <td>{v.quota}</td>
                  <td>
                    <div className="d-flex flex-column text-start">
                      <span style={{ width: 'fit-content' }} className="d-flex badge bg-secondary">{v.status}</span>
                      <span>{`${Formatter.DisplayDatetime(v.start_date)} - ${Formatter.DisplayDatetime(v.end_date)}`}</span>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column text-start">
                      <button type="button" className="voucher__action-button">Rincian</button>
                      <button type="button" className="voucher__action-button">Update</button>
                      <button type="button" className="voucher__action-button">Delete</button>
                    </div>
                  </td>
                </tr>
              ))
          }
      </tbody>
    </table>
  </div>
);
export default ListVoucher;
