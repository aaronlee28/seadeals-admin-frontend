class PromotionsAPI {
  static GetPromotions(ax:any, filter:any) {
    return ax.get(`/promotions?${filter}`);
  }

  static AddPromotion(ax:any) {
    return ax.post('/promotions');
  }

  static ViewPromotionDetail(ax:any, id:any = '') {
    return ax.get(`/view-detail-promotion/${id}`);
  }

  static UpdatePromotion(ax:any, id:any = '') {
    return ax.patch(`/promotions/${id}`);
  }
}

export default PromotionsAPI;
