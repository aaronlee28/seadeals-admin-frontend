import React, { FC, useEffect, useState } from 'react';
import '../PromotionsDashboard.scss';
import Button from '../../../../components/Button/Button';
import Modal from '../../../../components/Modal/Modal';

const ProductListInfo:FC<any> = ({
  addedProduct, products, discount, promotionType, quota, maxQuota,
  setQuota, setMaxQuota, setReqProducts,
}) => {
  const [productList, setProductList] = useState<any>([]);
  const [productIds, setProductIds] = useState<any>([]);
  const [show, setShow] = useState<any>(false);

  useEffect(() => {
    if (addedProduct !== undefined) {
      for (let i = 0; i < products.length; i += 1) {
        if (addedProduct === products[i].id.toString() && !productIds.includes(products[i].id)) {
          const promoProd = {
            product_id: products[i].id, product_name: products[i].name, quota, max_quota: maxQuota,
          };
          setProductList([...productList, promoProd]);
          setProductIds([...productIds, products[i].id]);
          setQuota('');
          setMaxQuota('');
        }
      }
    }
  }, [addedProduct]);

  useEffect(() => {
    if (productList.length > 0) {
      setReqProducts(productList);
    }
  }, [productList]);

  const [newQuota, setNewQuota] = useState<any>('');
  const [newMaxQuota, setNewMaxQuota] = useState<any>('');

  const handleChangeQuotas = (e:any) => {
    const values = e.target.value.split(',');
    for (let i = 0; i < productList.length; i += 1) {
      if (productList[i].product_id.toString() === values[0]) {
        const newProd = {
          product_id: productList[i].product_id,
          product_name: productList[i].product_name,
          quota: newQuota === '' ? productList[i].quota : newQuota,
          max_quota: newMaxQuota === '' ? productList[i].max_quota : newMaxQuota,
        };
        setShow(false);
        setProductList([...productList, newProd]);
      }
    }
  };

  useEffect(() => {
    if (productList.length > 1) {
      for (let i = 0; i < productList.length; i += 1) {
        for (let j = i + 1; j < productList.length; j += 1) {
          if (productList[i].product_id === productList[j].product_id) {
            setProductList(productList.splice(i, 1));
            return;
          }
        }
      }
    }
  }, [productList]);

  // const handleChangeMaxQuota = (e:any) => {
  //   setMaxQuota(e.target.value);
  // };

  return (
    <div className="product-list-info_container">
      <div className="table-responsive table_wrapper">
        <table className="table table-hover promotion-dashboard__table">
          <thead>
            <tr className="table-secondary" key={productList.length}>
              <th className="col-2 text-center" scope="row">Id Produk</th>
              <th>Nama Produk</th>
              <th className="text-center">Diskon</th>
              <th className="text-center">Kuota Pemakaian</th>
              <th className="text-center">Kuantitas Maksimal</th>
              <th className="text-center">Penyuntingan</th>
            </tr>
          </thead>
          <tbody>
            {
              productList.length === 0
                ? <tr key={productList.length}><td colSpan={6} className="text-center">Tambah produk!</td></tr>
                : productList.map((product:any) => (
                  <tr key={product.product_id}>
                    <td className="text-center">
                      {product.product_id}
                    </td>
                    <td>
                      {product.product_name}
                    </td>
                    <td className="text-center">
                      {promotionType === 'nominal' && 'Rp.'}
                      {' '}
                      {discount}
                      {' '}
                      {promotionType === 'percentage' && '%'}
                    </td>
                    <td className="text-center">{product.quota}</td>
                    <td className="text-center">{product.max_quota}</td>
                    {
                     !show && (
                     <td>
                       <div className="row">
                         <div className="d-flex col justify-content-center">
                           <Button buttonType="secondary alt" text="Ubah kuota" handleClickedButton={() => setShow(true)} />
                         </div>
                       </div>
                     </td>
                     )
                    }
                    { show && (
                    <td>
                      <Modal modalType="" cancel={() => setShow(false)}>
                        <div className="d-flex py-5 justify-content-center">
                          <div className="row px-5">
                            <h5 className="text-start mb-4"><b>Tambah promosi per produk</b></h5>
                            <div className="row mt-2 mb-5">
                              <label className="col-3 text-end align-self-center mb-3" htmlFor="product">Kuota Promosi</label>
                              <div className="col-9 p-0 mb-3">
                                <input className="form-control" placeholder="Masukkan jumlah kuota promosi" onChange={(e) => setNewQuota(e.target.value)} />
                              </div>
                              <label className="col-3 text-end align-self-center" htmlFor="product">Jumlah Maksimal</label>
                              <div className="col-9 p-0">
                                <input className="form-control" placeholder="Masukkan jumlah maksimal" onChange={(e) => setNewMaxQuota(e.target.value)} />
                              </div>
                            </div>
                            <div className="d-inline-flex justify-content-end gap-3">
                              <Button buttonType="secondary alt" text="Tutup" handleClickedButton={() => setShow(false)} />
                              <button value={[product.product_id, newQuota, newMaxQuota]} type="button" className="btn edit-button" onClick={handleChangeQuotas}>Ubah kuota</button>
                            </div>
                          </div>
                        </div>
                      </Modal>
                    </td>
                    )}
                  </tr>
                ))
          }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductListInfo;
