import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalConfirmation from '../../../../components/Modal/ModalConfirmation/ModalConfirmation';
import Button from '../../../../components/Button/Button';
import { ReactComponent as IconHeart } from '../../../../assets/svg/icon_heart.svg';
import '../Product.scss';
import Formatter from '../../../../utils/formatter';

const ListProduct:FC<any> = ({ products, setDeletedID, handleDelete }) => {
  const navigate = useNavigate();
  const [showModalDelete, setShowModalDelete] = useState(false);

  return (
    <div className="container">
      {showModalDelete && (
        <ModalConfirmation
          text="Kamu yakin akan menghapus produk ini?"
          handleClose={() => setShowModalDelete(false)}
          handleConfirm={() => {
            handleDelete();
            setShowModalDelete(false);
          }}
          setShowModal={setShowModalDelete}
        />
      )}
      <div className="table-responsive product-list__container">
        <table className="table table-hover product-list__table">
          <caption>List of shop product</caption>
          <thead>
            <tr className="table-secondary">
              <th>Nama Produk</th>
              <th>
                <div className="d-flex gap-4 align-items-end">
                  <span className="product-list__variant small">Kode Variasi</span>
                  <span className="product-list__variant large">Variasi</span>
                  <span className="product-list__variant large">Harga</span>
                  <span className="product-list__variant">Stok</span>
                </div>
              </th>
              <th>Penjualan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {
            products.length === 0
              ? <tr><td colSpan={4}>No vouchers</td></tr>
              : products.map((p:any) => (
                <tr key={p.id}>
                  <td>
                    <div className="product-list__product-main">
                      <img src={p.photo} alt="foto produk" className="product-list__photo" />
                      <div className="d-flex flex-column text-start">
                        <span className="product-list__name">{p.name}</span>
                        <span className="product-list__category">{p.category}</span>
                        <div className="product-list__caption">
                          {React.createElement(IconHeart, { className: 'product-list__icon' })}
                          <span>{p.favorite_count}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  {
                    p.product_variant_detail !== null
                      ? (
                        <td>
                          {p.product_variant_detail.map((pvd: any) => (
                            <div className="d-flex gap-4" key={pvd.id}>
                              <span className="product-list__variant small">{pvd.variant_code || '-'}</span>
                              {
                          pvd.variant_1_value || pvd.variant_2_value
                            ? (
                              <span
                                className="product-list__variant large"
                              >
                                {`${pvd.variant_1_value || ''}${pvd.variant_1_value && pvd.variant_2_value ? ',' : ''} ${pvd.variant_2_value || ''}`}
                              </span>
                            )
                            : <span className="product-list__variant">-</span>
                        }
                              <span className="product-list__variant large">{Formatter.DisplayPrice(pvd.price)}</span>
                              <span className="product-list__variant">{pvd.stock !== 0 ? pvd.stock : 'Habis'}</span>
                            </div>
                          ))}
                        </td>
                      )
                      : <td><tr>No variant</tr></td>
                    }
                  <td><span className="product-list__variant">{p.sold_count}</span></td>
                  <td>
                    <div className="d-flex flex-column align-items-start">
                      <Button buttonType="plain action-button" handleClickedButton={() => navigate(`/seller/product/show/${p.id}`)} text="Lihat" />
                      <Button buttonType="plain action-button" handleClickedButton={() => navigate(`/seller/product/update/${p.id}`)} text="Ubah" />
                      <Button buttonType="plain action-button" handleClickedButton={() => navigate(`/seller/product/new?copy=${p.id}`)} text="Duplikat" />
                      <Button buttonType="plain action-button" handleClickedButton={() => { setShowModalDelete(true); setDeletedID(p.id); }} text="Hapus" />
                    </div>
                  </td>
                </tr>
              ))
          }
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ListProduct;
