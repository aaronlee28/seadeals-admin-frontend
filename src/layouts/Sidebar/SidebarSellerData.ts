import { ReactComponent as IconChevron } from '../../assets/svg/icon_chevron_right.svg';
import { ReactComponent as IconProduct } from '../../assets/svg/icon_product.svg';
import { ReactComponent as IconVoucher } from '../../assets/svg/icon_voucher.svg';

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
    id: 2,
    title: 'Voucher Toko',
    path: '',
    icon: IconVoucher,
    iconClosed: IconChevron,
    iconOpened: IconChevron,
    subNav: [
      {
        title: 'Buat voucher',
        path: '/seller/voucher/new',
        icon: IconVoucher,
      },
      {
        title: 'Daftar voucher',
        path: '/seller/voucher/list',
        icon: IconVoucher,
      },
    ],
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
];

export default SidebarSellerData;
