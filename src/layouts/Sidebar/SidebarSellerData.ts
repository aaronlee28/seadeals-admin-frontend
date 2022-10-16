import { ReactComponent as IconChevron } from '../../assets/svg/icon_chevron_right.svg';
import { ReactComponent as IconProduct } from '../../assets/svg/icon_product.svg';
import { ReactComponent as IconVoucher } from '../../assets/svg/icon_voucher.svg';
import { ReactComponent as IconPromotion } from '../../assets/svg/icon_shoutout.svg';

const SidebarSellerData = [
  {
    id: 1,
    title: 'Beranda',
    path: '/seller',
    icon: IconVoucher,
    iconClosed: IconChevron,
    iconOpened: IconChevron,
    subNav: null,
  },
  {
    id: 3,
    title: 'Produk',
    path: '',
    icon: IconProduct,
    iconClosed: IconChevron,
    iconOpened: IconChevron,
    subNav: [
      {
        title: 'Daftar produk',
        path: '/seller/product/list',
        icon: IconProduct,
      },
      {
        title: 'Buat produk',
        path: '/seller/product/new',
        icon: IconProduct,
      },
    ],
  },
  {
    id: 2,
    title: 'Voucher Toko',
    path: '',
    icon: IconVoucher,
    iconClosed: IconChevron,
    iconOpened: IconChevron,
    subNav: [
      {
        title: 'Daftar voucher',
        path: '/seller/voucher/list',
        icon: IconVoucher,
      },
      {
        title: 'Buat voucher',
        path: '/seller/voucher/new',
        icon: IconVoucher,
      },
    ],
  },
  {
    id: 4,
    title: 'Pomosi',
    path: '',
    icon: IconPromotion,
    iconClosed: IconChevron,
    iconOpened: IconChevron,
    subNav: [
      {
        title: 'Daftar promosi',
        path: '/seller/promotions/list',
        icon: IconPromotion,
      },
      {
        title: 'Buat promosi',
        path: '/seller/promotions/new',
        icon: IconPromotion,
      },
    ],
  },
];

export default SidebarSellerData;
