import { useNavigate } from 'react-router-dom';
import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Button from '../../../components/Button/Button';
import Pagination from '../../../components/Pagination/Pagination';
import ProductAPI from '../../../api/product';
import ListProduct from './DashboardItem/ListProduct';
import '../Voucher/Voucher.scss';

const DashboardProduct:FC<any> = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const innerRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [deletedID, setDeletedID] = useState(undefined);

  const findProductBySellerID = async () => {
    const filter = `page=${page}&limit=5`;
    await ProductAPI.FindProductBySellerID(axiosPrivate, filter)
      .then((resp:any) => {
        const { data } = resp.data;
        setTotalPage(data.total_page);
        setPage(data.current_page);
        setProducts(data.products);
      })
      .catch((err:any) => err);
  };

  const handleDelete = async () => {
    await ProductAPI.DeleteProductByID(axiosPrivate, deletedID)
      .then((resp: any) => {
        const { data } = resp.data;
        console.log(data);
        setDeletedID(undefined);
      })
      .catch((err: any) => err);
  };

  useEffect(() => {
    findProductBySellerID().then();
  }, [page, deletedID]);

  return (
    <div className="voucher__container">
      <h3>Daftar Produk</h3>
      <div className="voucher__content">
        <div className="d-flex justify-content-between mb-4 pb-4">
          <div className="d-flex flex-column text-start">
            <h5 className="m-0">Daftar Produk</h5>
            <p className="m-0 p-0">Buat produk untuk dijual di toko kamu</p>
          </div>
          <Button buttonType="secondary" text="Buat produk" handleClickedButton={() => navigate('/seller/product/new')} />
        </div>
        <div>
          <ListProduct
            products={products}
            setDeletedID={setDeletedID}
            handleDelete={handleDelete}
          />
          <Pagination
            totalPage={totalPage}
            page={page}
            setPage={setPage}
            innerRef={innerRef}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardProduct;
