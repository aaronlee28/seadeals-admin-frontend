class VoucherAPI {
  static FindVoucherByUserID(ax:any, filter:any) {
    return ax.get(`/vouchers?${filter}`);
  }

  static FindVoucherByID(ax:any, id:any = '') {
    return ax.get(`/vouchers/${id}`);
  }

  static DeleteVoucherByID(ax:any, id:any = '') {
    return ax.delete(`/vouchers/${id}`);
  }
}

export default VoucherAPI;
