class ProductAPI {
  static FindProductBySellerID(ax:any, filter:any) {
    return ax.get(`/sellers/products?${filter}`);
  }

  static FindProductByID(ax:any, id:any = '') {
    return ax.get(`/sellers/products/${id}`);
  }

  static DeleteProductByID(ax:any, id:any = '') {
    return ax.delete(`/sellers/products/${id}`);
  }
}

export default ProductAPI;
