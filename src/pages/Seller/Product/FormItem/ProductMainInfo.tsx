import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import toast from 'react-hot-toast';
import VoucherConstant from '../../../../constants/voucher';
import Modal from '../../../../components/Modal/Modal';
import CategoryInput from './CategoryInput';

const ProductMainInfo:FC<any> = ({
  product, formType, handleOnChange, setCategoryID,
}) => {
  const imageInputRef = useRef<any>();
  const [category, setCategory] = useState({
    id: 0,
    name: '',
  });
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [productPhoto, setProductPhoto] = useState<string[]>([]);

  useEffect(() => {
    setCategoryID(category.id);
  }, [category]);

  const handleImageChange = (e:any) => {
    e.preventDefault();
    if (productPhoto.length > 5) {
      return;
    }
    const [file] = e.target.files;
    // In MegaByte
    if ((file.size / 1024 / 1024) > 2) {
      toast.error('Photo tidak bisa lebih dari 2MB');
      return;
    }
    if (file) {
      setProductPhoto(productPhoto.concat([URL.createObjectURL(file)]));
      const reader = new FileReader();
      reader.readAsDataURL(file);
      imageInputRef.current.value = '';
    }
  };

  const onDeleteClick = (idx:number) => (e:any) => {
    e.preventDefault();
    setProductPhoto(productPhoto.filter((el, i) => (i !== idx)));
  };

  return (
    <div className="my-4">
      {
        showCategoryModal
          && (
          <Modal modalType="" cancel={() => setShowCategoryModal(false)}>
            <CategoryInput
              setCatData={setCategory}
              handleClose={() => setShowCategoryModal(false)}
            />
          </Modal>
          )
      }
      <h5 className="text-start"><b>Informasi Dasar</b></h5>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center" htmlFor="photo">Foto Produk</label>
        <div className="col-9 p-0 d-flex justify-content-start">
          {productPhoto.map(
            (el, i) => (
              <button className="product-form__image" key={`test${i.toString()}`} type="button" onClick={onDeleteClick(i)}>
                <div className="d-flex flex-column justify-content-center product-form__image__filter">
                  <div>
                    X
                  </div>
                </div>
                <img className="img-fit product-form__image" alt={i.toString()} src={el} />
              </button>
            ),
          )}
          {productPhoto.length < 5 && (
            <button className="product-form__add-image-button" type="button" onClick={() => { imageInputRef.current.click(); }}>
              <div>
                +
              </div>
            </button>
          )}
          <input
            name="image"
            className="col-9 border rounded p-2 product-form__add-image"
            type="file"
            required
            value={product.product_photos[0]}
            readOnly={formType === VoucherConstant.SHOW}
            disabled={formType === VoucherConstant.SHOW}
            onInput={handleImageChange}
            ref={imageInputRef}
          />
        </div>
      </div>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center" htmlFor="name">Nama Produk</label>
        <input
          name="name"
          className="col-9 border rounded p-2"
          maxLength={100}
          placeholder="Masukkan nama produk"
          type="text"
          required
          value={product.name}
          readOnly={formType === VoucherConstant.SHOW}
          disabled={formType === VoucherConstant.SHOW}
          onChange={handleOnChange}
        />
      </div>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center">Kategori</label>
        <div className="col-9 product-form__category" role="presentation" onClick={() => setShowCategoryModal(true)}>
          <span>{category.name || 'Pilih kategori'}</span>
        </div>
      </div>
      <div className="row my-3">
        <label className="col-3 text-end align-self-center" htmlFor="description">Deskripsi</label>
        <textarea
          name="description"
          className="col-9 border rounded p-2"
          maxLength={2000}
          placeholder="Masukkan deskripsi produk"
          required
          value={product.description}
          readOnly={formType === VoucherConstant.SHOW}
          disabled={formType === VoucherConstant.SHOW}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};

export default ProductMainInfo;
