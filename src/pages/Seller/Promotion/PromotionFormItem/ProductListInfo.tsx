import React, { FC } from 'react';
import '../PromotionsDashboard.scss';

const ProductListInfo:FC<any> = ({ products, discount, promotionType }) => (
  <div className="container">
    <div className="table-responsive table_wrapper">
      <table className="table table-hover promotion-dashboard__table">
        <thead>
          <tr className="table-secondary">
            <th className="col-2" scope="row">Id Produk</th>
            <th>Nama Produk</th>
            <th>Diskon</th>
            <th>Kuota Pemakaian</th>
            <th>Kuantitas Maksimal</th>
          </tr>
        </thead>
        <tbody>
          {
                        products.length === 0
                          ? <tr><td colSpan={5} className="text-center">Tambah produk!</td></tr>
                          : products.map((product:any) => (
                            <tr key={product.id}>
                              <td>
                                {product.id}
                              </td>
                              <td>
                                {product.name}
                              </td>
                              <td>
                                {promotionType === 'nominal' && 'Rp.'}
                                {' '}
                                {discount}
                                {' '}
                                {promotionType === 'percentage' && '%'}
                              </td>
                              <td className="text-center"><input type="number" className="form-control" min="0" step="1" id="amountInput" /></td>
                              <td><input type="number" className="form-control" /></td>
                            </tr>
                          ))
                    }
        </tbody>
      </table>
    </div>
  </div>
);

export default ProductListInfo;
