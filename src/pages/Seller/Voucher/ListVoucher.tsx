import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Formatter from '../../../utils/formatter';
import Modal from '../../../components/Modal/Modal';
import Confirmation from '../../../components/Modal/Confirmation';

const ListVoucher:FC<any> = ({ vouchers, setDeletedID, handleDelete }) => {
  const navigate = useNavigate();
  const [showModalDelete, setShowModalDelete] = useState(false);

  return (
    <div className="container">
      {showModalDelete && (
      <Modal cancel={() => setShowModalDelete(false)}>
        <Confirmation
          text="Kamu yakin untuk mengakhiri voucher ini?"
          handleClose={() => setShowModalDelete(false)}
          handleConfirm={() => {
            handleDelete(); setShowModalDelete(false);
          }}
        />
      </Modal>
      )}
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
                      <button type="button" className="voucher__action-button" onClick={() => navigate(`/seller/voucher/show/${v.id}`)}>Rincian</button>
                      <button type="button" className="voucher__action-button" onClick={() => navigate(`/seller/voucher/update/${v.id}`)} disabled={v.status === 'ended'}>Ubah</button>
                      <button type="button" className="voucher__action-button" onClick={() => navigate(`/seller/voucher/new?copy=${v.id}`)}>Duplikat</button>
                      <button type="button" className="voucher__action-button" disabled={v.status !== 'upcoming'} onClick={() => { setShowModalDelete(true); setDeletedID(v.id); }}>Akhiri</button>
                    </div>
                  </td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  );
};
export default ListVoucher;
